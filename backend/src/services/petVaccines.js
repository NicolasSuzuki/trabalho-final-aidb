const db = require("../models_elastic/db");
const PetVaccine = require("../models_elastic/PetVaccine");
const { DateTime } = require("luxon");

petVaccineServices = {
  addVaccineToPet: async ({ vaccineId, petId }, res) => {
    if (!vaccineId || !petId)
      return res.json({ erro: true, mensagem: "Faltam informacoes" });

    try {
      // Step 1: Check if the relationship already exists in Elasticsearch
      const existingRelation = await db.search({
        index: 'pet-vaccine',
        body: {
          query: {
            bool: {
              must: [
                { match: { vaccineId } },
                { match: { petId } }
              ]
            }
          }
        }
      });
  
      if (existingRelation.hits.total.value > 0) {
        // Relationship already exists
        return res.json({
          erro: false,
          mensagem: "Vacinas existente",
          data: existingRelation.hits.hits[0]._source
        });
      }
  
      // Step 2: If the relationship doesn't exist, create it
      const newRelation = {
        vaccineId,
        petId,
        vaccinatedAt: null,
        createdAt: DateTime.now()
      };
  
      const createdRelation = await db.index({
        index: 'pet-vaccine',
        body: newRelation
      });
  
      return res.json({
        erro: false,
        mensagem: "Vacinas para o pet adicionado com sucesso",
        data: createdRelation
      });
    } catch (error) {
      console.error('Error adding vaccine to pet:', error);
      return res.json({
        erro: true,
        mensagem: "Erro ao adicionar vacina ao pet"
      });
    }
  },
  removeVaccineToPet: async ({ vaccineId, petId }, res) => {
    if (!vaccineId || !petId)
      return { erro: true, mensagem: "Faltam informacoes" };

    try {
      // Step 1: Search for the existing relationship in Elasticsearch
      const searchResult = await db.search({
        index: 'pet-vaccine',
        body: {
          query: {
            bool: {
              must: [
                { match: { vaccineId } },
                { match: { petId } }
              ]
            }
          }
        }
      });
  
      if (searchResult.hits.total.value > 0) {
        const docId = searchResult.hits.hits[0]._id;
  
        // Step 2: If the relationship exists, delete it
        await db.delete({
          index: 'pet-vaccine',
          id: docId
        });
  
        return res.json({
          erro: false,
          mensagem: "Vacina removida com sucesso",
          data: searchResult.hits.hits[0]._source
        });
      } else {
        return res.json({
          erro: true,
          mensagem: "Relação de vacina não encontrada"
        });
      }
    } catch (error) {
      console.error('Error removing vaccine from pet:', error);
      return res.json({
        erro: true,
        mensagem: "Erro ao remover vacina do pet"
      });
    }
  },
  updatePetVaccines: async ({ petId, vaccineId, date }, res) => {
    if (!vaccineId || !petId)
      return { erro: true, mensagem: "Faltam informacoes" };
    return PetVaccine.findOne({
      where: { petId, vaccineId },
    }).then(async (pet) => {
      pet.vaccinatedAt = date;
      await pet.save();
      return res.json(pet);
    });
  },
};

module.exports = petVaccineServices;
