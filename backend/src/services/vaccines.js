const Vaccine = require("../models_elastic/Vaccine");
const db = require("../models_elastic/db");

const vaccineServices = {
  getAllVaccines: async (res) => {
    const resp = await db.search({
      index: 'vaccines',
      body: {
        query: {
          match_all: {}
        }
      }
    });
    const vaccines = resp.hits.hits.map(hit => ({...hit._source, id: hit._id})).filter(vaccine => vaccine.name);
    return vaccines;
  },
  createVaccine: async (vaccine, res) => {
    if (!vaccine.name || !vaccine.doses)
      return res.json({ erro: true, mensagem: "Faltam informações" });

    let vaccineFather = null;
    let vaccines = [];
    for (let i = 0; i < vaccine.doses; i++) {
      const name = `${vaccine.name} ${i + 1}/${vaccine.doses}`;
      const result = await db.index({
        index: 'vaccines',
        body: { name, vaccineId: vaccineFather }
      });
      const createdVaccine = { id: result._id, name, vaccineId: vaccineFather };
      vaccines.push(createdVaccine);
      vaccineFather = result._id;
    }
    return res.json({
      erro: false,
      mensagem: "Vacina(s) cadastrada(s) com sucesso",
      data: vaccines,
    });
  },
  updatePetVaccines: async ({ vaccineId, petId, date }, res) => {
    const { body } = await client.search({
      index: 'pet-vaccines',
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
    if (body.hits.total.value === 0) {
      return res.json({ erro: true, mensagem: "Vacina não encontrada" });
    }

    const petVaccineId = body.hits.hits[0]._id;
    const petVaccine = body.hits.hits[0]._source;
    petVaccine.vaccinatedAt = date;

    await client.index({
      index: 'pet-vaccines',
      id: petVaccineId,
      body: petVaccine
    });

    return res.json(petVaccine);
  },
};

module.exports = vaccineServices;
