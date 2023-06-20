const db = require("../models/db");
const Pet = require("../models/Pet");
const { DateTime } = require("luxon");

const getAppointments = (appointments) => {
  if (appointments.length <= 0)
    return {
      appointments: [],
      nextAppointment: undefined,
      nextAppointments: [],
      history: [],
    };
  const now = DateTime.now();
  const nextAppointments = appointments.filter(
    (appointment) => appointment.date.getTime() > now
  );
  const history = appointments.filter(
    (appointment) => appointment.date.getTime() < now
  );
  const nextAppointment = nextAppointments.length
    ? nextAppointments.reduce((closest, appointment) => {
        const closestTimeDiff = Math.abs(
          DateTime.fromISO(closest.date.getTime()).minus(now)
        );
        const appointmentTimeDiff = Math.abs(
          DateTime.fromISO(appointment.date.getTime()).minus(now)
        );
        return appointmentTimeDiff < closestTimeDiff ? appointment : closest;
      })
    : undefined;
  return {
    appointments,
    nextAppointment,
    nextAppointments: nextAppointments.filter(
      (appoint) => appoint !== nextAppointment
    ),
    history,
  };
};
const petServices = {
  getAllPets: async () => {
    const [pets, metadata] = await db.query(
      "SELECT pets.*, i.data, u.name as `ownerName` FROM `pets` JOIN `users` as u on u.id = pets.userId LEFT JOIN `images` as i on i.id = pets.imageId"
    );
    return pets;
  },
  getPetsByUserId: async ({ user, res }) => {
    const [pets, metadata] = await db.query(
      "SELECT pets.*, i.data FROM `users` as u JOIN `pets` on u.id = pets.userId LEFT JOIN `images` as i on i.id = pets.imageId WHERE u.id = ?",
      { replacements: [user.id] }
    );
    return pets;
  },
  getPetById: async ({ petId }) => {
    const [pets, metadata] = await db.query(
      "SELECT pets.*, i.data FROM `users` as u JOIN `pets` on u.id = pets.userId LEFT JOIN `images` as i on i.id = pets.imageId WHERE pets.id = ?",
      { replacements: [petId] }
    );

    return pets;
  },
  getPetExamsByPetId: async ({ petId }) => {
    const [petExam, metadata] = await db.query(
      "select pets.*, exams.*, images.data as examData from exams join images on images.id = exams.imageId join pets on pets.id = exams.petId where pets.id = ?",
      { replacements: [petId] }
    );
    return petExam;
  },
  getPetsHistoryByUserId: async ({ userId }) => {
    const [results, metadata] = await db.query(
      "SELECT e.*, pets.* FROM `users` as u JOIN `pets` on u.id = pets.userId LEFT JOIN `exams` as e on e.petId = pets.id WHERE e.date IS NOT NULL AND u.id = ?",
      { replacements: [userId] }
    );
    const [appointments, metadatas] = await db.query(
      "SELECT e.*, pets.* FROM `users` as u JOIN `pets` on u.id = pets.userId LEFT JOIN `appointments` as e on e.petId = pets.id WHERE e.date IS NOT NULL AND u.id = ?",
      { replacements: [userId] }
    );
    return { results, appointments };
  },
  getPetsResults: async () => {
    const [pets, metadata] = await db.query("SELECT pets.* FROM `pets`");
    const [users, metadatas] = await db.query(
      "SELECT id, name, email FROM `users`"
    );
    const [results, metasdatas] = await db.query(
      "SELECT i.*, exams.* FROM `exams` LEFT JOIN `images` as i ON i.id = exams.imageId"
    );
    return { pets, users, results };
  },
  getPetsAppointmentsByUserId: async ({ userId, pets }) => {
    const [appointments, metadata] = await db.query(
      "SELECT a.*, p.* FROM `appointments` as a JOIN `pets` as p on p.id = a.petId LEFT JOIN `users` as u on u.id = p.userId where u.id = ?",
      { replacements: [userId] }
    );
    const petAppointments = pets.map((pet) => ({
      pet,
      ...getAppointments(appointments.filter((ap) => ap.petId === pet.id)),
    }));
    return petAppointments;
  },
  getPetsAppointments: async () => {
    const [pets, metadata] = await db.query("SELECT pets.* FROM `pets`");
    const [users, metadatas] = await db.query(
      "SELECT id, name, email FROM `users`"
    );
    const [appointments, metasdatas] = await db.query(
      "SELECT appointments.* FROM `appointments`"
    );
    const appointmentsInfo = getAppointments(appointments);
    return { users, pets, ...appointmentsInfo };
  },
  getPetAppointmentsByPetId: async ({ pet }) => {
    const [appointments, metadata] = await db.query(
      "SELECT a.*, p.* FROM `appointments` as a JOIN `pets` as p on p.id = a.petId LEFT JOIN `users` as u on u.id = p.userId where a.deletedAt is null and p.id = ?",
      { replacements: [pet.id] }
    );
    const resp = getAppointments(appointments);
    return { pet, ...resp };
  },
  getPetVaccinesByPetId: async ({ petId }) => {
    const [vaccines, metadata] = await db.query(
      "SELECT v.name as vaccineName, pv.vaccinatedAt, p.* FROM `vaccines` as v JOIN `pet-vaccines` as pv on pv.vaccineId = v.id LEFT JOIN `pets` as p on p.id = pv.petId where p.id = ?",
      { replacements: [petId] }
    );
    return vaccines;
  },
  createPet: async ({ pet }, res) => {
    if (!pet.userId) pet["userId"] = user.dataValues.id;
    if (pet.userId) pet["userId"] = parseInt(pet.userId, 10);
    return Pet.create(pet)
      .then((r) =>
        res.json({
          erro: false,
          mensagem: "Pet cadastrado com sucesso",
          data: r,
        })
      )
      .catch(() =>
        res.json({
          erro: true,
          mensagem: "Erro ao cadastrar pet",
        })
      );
  },
  updatePet: async ({ petId, imageId }, res) => {
    const pet = await Pet.findOne({ where: { id: petId } });
    pet.imageId = imageId;
    await pet.save();
    const petToReturn = await petServices.getPetById({ petId: petId });
    return res.json(petToReturn);
  },
};

module.exports = petServices;
