const db = require("../models_elastic/db");
const getToken = require("../utils/token");

const userServices = {
  getUserByToken: async (token) => {
    if (!token) return null;

    const result = await db.search({
      index: 'users',
      body: {
        query: {
          term: { token }
        }
      }
    });

    const user = result.hits.hits.length > 0 ? {...result.hits.hits[0]._source, id: result.hits.hits[0]._id} : null;
    return user
  },
  getUserById: async (id) => {
    if (!id) return null;

    const result = await db.get({
      index: 'users',
      id
    });

    return result.body._source;
  },
  loginAdminUser: async ({ email, password }) => {
    const result = await db.search({
      index: 'users',
      body: {
        query: {
          bool: {
            must: [
              { match: { email } },
              { match: { password } },
              { term: { is_admin: true } }
            ]
          }
        }
      }
    });

    if (result.hits.hits.length > 0) {
      const user = result.hits.hits[0];
      const updatedUser = { ...user._source, token: getToken() };

      await db.index({
        index: 'users',
        id: user._id,
        body: updatedUser
      });

      return updatedUser;
    }

    return null;
  },

  loginUser: async ({ email, password }) => {
    const result = await db.search({
      index: 'users',
      body: {
        query: {
          bool: {
            must: [
              { match: { email } },
              { match: { password } }
            ]
          }
        }
      }
    });

    if (result.hits.hits.length > 0) {
      const user = result.hits.hits[0];
      const updatedUser = { ...user._source, token: getToken() };

      await db.index({
        index: 'users',
        id: user._id,
        body: updatedUser
      });

      return updatedUser;
    }

    return null;
  },

  logoffUser: async ({ token }) => {
    const result = await db.search({
      index: 'users',
      body: {
        query: {
          term: { token }
        }
      }
    });

    if (result.hits.hits.length > 0) {
      const user = result.hits.hits[0];
      const updatedUser = { ...user._source, token: null };

      await db.index({
        index: 'users',
        id: user._id,
        body: updatedUser
      });

      return updatedUser;
    }

    return null;
  },

  createUser: async (body) => {
    try {
      const result = await db.index({
        index: 'users',
        id: getToken(),
        body
      });

      return {
        erro: false,
        mensagem: "Usuário cadastrado com sucesso",
        user: result.body
      };
    } catch (error) {
      return {
        erro: true,
        mensagem: "Usuário não cadastrado",
      };
    }
  },
  deleteUser: async (id) => {
    try {
      const result = await db.delete({
        index: 'users',
        id: id
      });
  
      return {
        erro: false,
        mensagem: "Usuário deletado com sucesso",
        result: result.body
      };
    } catch (error) {
      return {
        erro: true,
        mensagem: "Erro ao deletar usuário",
        detalhes: error.message
      };
    }
  },
  updateUser: async (id, updatedFields) => {
    try {
      const result = await db.update({
        index: 'users',
        id: id,
        body: {
          doc: updatedFields
        }
      });
  
      return {
        erro: false,
        mensagem: "Usuário atualizado com sucesso",
        result: result.body
      };
    } catch (error) {
      return {
        erro: true,
        mensagem: "Erro ao atualizar usuário",
        detalhes: error.message
      };
    }
  }

};
module.exports = userServices;
