const db = require("../models_elastic/db");
const Pet = require("../models_elastic/Pet");
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
    (appointment) => DateTime.fromISO(appointment.date) > now
  );
  const history = appointments.filter(
    (appointment) => DateTime.fromISO(appointment.date) < now
  );
  const nextAppointment = nextAppointments.length
    ? nextAppointments.reduce((closest, appointment) => {
      const closestTimeDiff = Math.abs(
        DateTime.fromISO(closest.date).diff(now)
      );
      const appointmentTimeDiff = Math.abs(
        DateTime.fromISO(appointment.date).diff(now)
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
    try {
      const body = await db.search({
        index: 'pets',
        body: {
          query: {
            match_all: {}
          },
          _source: [
            'userId',
            'name',
            'species',
            'race',
            'birthday',
            'sex',
            'color',
            'imageId'
          ]
        }
      });

      const pets = body.hits.hits.map((hit) => ({
        ...hit._source,
        id: hit._id
      })).filter(pet => pet.name);

      // Assuming you have a separate index for users and images
      const userIds = pets.map(pet => pet.userId);
      const imageIds = pets.map(pet => pet.imageId);

      let users = [];
      if (userIds.length > 0) {
        const userBody = await db.mget({
          index: 'users',
          body: {
            ids: userIds.map(String)  // Ensure IDs are strings
          }
        });
        users = userBody.docs.map(doc => ({ ...doc._source, id: doc._id }));
      }

      let images = [];
      if (imageIds.length > 0) {
        const imageBody = await db.mget({
          index: 'images',
          body: {
            ids: imageIds.map(String)  // Ensure IDs are strings
          }
        });
        images = imageBody.docs.map(doc => ({ ...doc._source, id: doc._id }));
      }

      const vaccines = await db.search({
        index: 'vaccines',
        body: {
          query: {
            match_all: {}
          },
        }
      }).then(resps => resps.hits.hits.filter(item => item._source.name).map(item => ({ ...item._source, id: item._id })));

      const petVaccines = await db.search({
        index: 'pet-vaccine',
        body: {
          query: {
            match_all: {}
          },
          _source: ['petId', 'vaccinatedAt', 'vaccineId']
        }
      }).then(resps => resps.hits.hits.filter(item => item._source.petId).map(item => ({ ...item._source, id: item._id })));

      const result = pets.map(pet => ({
        ...pet,
        ownerName: users.find(user => user.id === pet.userId)?.name,
        imageData: images.find(image => image.id === pet.imageId)?.data,
        vaccines: petVaccines.filter(vaccine => vaccine.petId === pet.id).map(vaccine => ({ ...vaccine, name: vaccines.find(v => v.id === vaccine.vaccineId)?.name })),
      }));

      return result;
    } catch (error) {
      console.error('Error fetching pets from Elasticsearch:', error);
      return [];
    }
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
    try {
      // Consulta para obter todos os pets
      const petsResponse = await db.search({
        index: 'pets',
        body: {
          query: {
            match_all: {}
          }
        }
      });

      const pets = petsResponse.hits.hits.map(hit => ({ ...hit._source, id: hit._id })).filter(item => !item.mappings);

      // Consulta para obter todos os usuários
      const usersResponse = await db.search({
        index: 'users',
        body: {
          query: {
            match_all: {}
          }
        }
      });

      const users = usersResponse.hits.hits.map(hit => ({ ...hit._source, id: hit._id })).filter(item => !item.mappings);

      // Consulta para obter todos os exames, junto com suas imagens
      const examsResponse = await db.search({
        index: 'exams',
        body: {
          query: {
            match_all: {}
          },
          _source: {
            includes: ['*', 'images.*'] // Inclui todos os campos de exams e de images
          }
        }
      });

      const results = examsResponse.hits.hits.map(hit => ({ ...hit._source, id: hit._id })).filter(item => !item.mappings);

      return { pets, users, results };
    } catch (error) {
      console.error("Erro ao buscar resultados no Elasticsearch:", error);
      return { pets: [], users: [], results: [] };
    }
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
    // Fetch pets data from Elasticsearch
    const petsResult = await db.search({
      index: 'pets',
      body: {
        query: {
          match_all: {}
        }
      }
    });
    const pets = petsResult.hits.hits.map(hit => ({ ...hit._source, id: hit._id })).filter(pet => pet.name);

    // Fetch users data from Elasticsearch
    const usersResult = await db.search({
      index: 'users',
      body: {
        query: {
          match_all: {}
        }
      }
    });
    const users = usersResult.hits.hits.map(hit => ({ ...hit._source, id: hit._id })).filter(user => user.email);

    // Fetch appointments data from Elasticsearch
    const appointmentsResult = await db.search({
      index: 'appointments',
      body: {
        query: {
          match_all: {}
        }
      }
    });
    const appointments = appointmentsResult.hits.hits.map(hit => ({...hit._source, id: hit._id })).filter(appointment => appointment.petId);

    // Process appointments information
    const appointmentsInfo = getAppointments(appointments);

    // Return the combined data
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
    try {
      // Indexando o novo pet no Elasticsearch
      const result = await db.index({
        index: 'pets', // Nome do índice onde o documento será armazenado
        body: pet      // O documento que será armazenado
      });

      // Respondendo com sucesso
      res.json({
        erro: false,
        mensagem: "Pet cadastrado com sucesso",
        data: result.body // O resultado da operação de indexação
      });
    } catch (error) {
      // Tratamento de erro
      console.error("Erro ao cadastrar pet no Elasticsearch:", error);
      res.json({
        erro: true,
        mensagem: "Erro ao cadastrar pet",
      });
    }

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
