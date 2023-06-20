const Vaccine = require("../models/Vaccine");
const db = require("../models/db");

const vaccineServices = {
  getAllVaccines: async (res) => {
    const [vaccines, metadata] = await db.query(
      "SELECT * FROM `vaccines`"
    );
    const [petVaccines, metadata1] = await db.query(
      "SELECT pv.*, v.name FROM `pet-vaccines` as pv JOIN `vaccines` as v on v.id = pv.vaccineId"
    );

    return [vaccines, petVaccines];
  },
  createVaccine: async (vaccine, res) => {
    if (!vaccine.name || !vaccine.doses)
      return res.json({ erro: true, mensagem: "Faltam informacoes" });

    let vaccineFather = null;
    let vaccines = [];
    for (let i = 0; i < vaccine.doses; i++) {
      const name = `${vaccine.name} ${i + 1}/${vaccine.doses}`;
      await Vaccine.create({ name, vaccineId: vaccineFather }).then((r) => {
        vaccines = vaccines.concat([r.dataValues]);
        vaccineFather = r.dataValues.id;
      });
    }
    return res.json({
      erro: false,
      mensagem: "Vacina(s) cadastrada(s) com sucesso",
      data: vaccines,
    });
  },
  updatePetVaccines: async ({ vaccineId, petId, date }, res) => {
    petVaccine = await PetVaccine.findOne({
      where: { vaccineId, petId },
    });
    petVaccine.vaccinatedAt = date;
    await petVaccine.save();
    return res.json(petVaccine);
  },
};

module.exports = vaccineServices;
