const PetVaccine = require("../models/PetVaccine");
const { DateTime } = require("luxon");

petVaccineServices = {
  addVaccineToPet: async ({ vaccineId, petId }, res) => {
    console.log(vaccineId, petId, "backend add");
    if (!vaccineId || !petId)
      return res.json({ erro: true, mensagem: "Faltam informacoes" });

    const relationPetVaccine = await PetVaccine.findOne({
      where: { petId: petId, vaccineId: vaccineId },
    });
    if (relationPetVaccine)
      return res.json({
        erro: false,
        mensagem: "Vacinas existente",
        data: relationPetVaccine,
      });
    return PetVaccine.create({
      vaccineId,
      petId,
      vaccinatedAt: null,
      createdAt: DateTime.now(),
    }).then((r) =>
      res.json({
        erro: false,
        mensagem: "Vacinas para o pet adicionado com sucesso",
        data: r,
      })
    );
  },
  removeVaccineToPet: async ({ vaccineId, petId }, res) => {
    if (!vaccineId || !petId)
      return { erro: true, mensagem: "Faltam informacoes" };
    console.log(petId, vaccineId);
    PetVaccine.findOne({
      where: { petId, vaccineId },
    }).then(async (r) => {
      if (r) await r.destroy();
      return res.json(r);
    });
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
