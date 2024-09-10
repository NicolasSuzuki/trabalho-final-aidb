const db = require("../models_elastic/db");
const Appointment = require("../models_elastic/Appointment");

const appointmentServices = {
  create: async ({ date, petId, description }, res) => {
    if (!date || !petId)
      return res.json({ erro: true, mensagem: "Faltam informacoes" });

    try {
      // Validate input
      if (!date || !petId)
        return res.json({ erro: true, mensagem: "Faltam informacoes" });

      // Create a new appointment document in Elasticsearch
      const result = await db.index({
        index: 'appointments',
        body: {
          date,
          petId,
          description,
          createdAt: new Date() 
        }
      });

      // Check if the document was created successfully
      if (result.result === 'created') {
        return res.json({
          erro: false,
          mensagem: "Consulta para o pet adicionado com sucesso",
          data: result.body
        });
      } else {
        throw new Error('Failed to create appointment');
      }
    } catch (error) {
      // Handle error
      console.error('Error creating appointment:', error);
      return res.json({
        erro: true,
        mensagem: "Erro ao adicionar consulta para o pet",
      });
    }
  },
  update: async ({ date, id, description }, res) => {
    try {
      await db.update({
        index: 'appointments',
        id: id,
        body: {
          date,
          description,
          petId
        }
      });

      return res.json({ id, date, description, petId });
    } catch (error) {
      return {
        erro: true,
        mensagem: "Erro ao atualizar",
        detalhes: error.message
      };
    }
  },
  cancelAppointment: async ({ appointmentId }, res) => {
    try {
      const appointment = await db.search({
        index: 'appointments', 
        body: {
          query: {
            match: {
              _id: appointmentId
            }
          }
        }
      }).then(r => r.hits.hits[0]._source);
      console.log(appointment, appointmentId)
      await db.index({
        index: 'appointments', 
        id: appointmentId,
        body: {
          date: appointment.date,
          description: appointment.description,
          petId: appointment.petId,
          deletedAt: new Date()
        }
      });

      return res.json(appointment);
    } catch (error) {
      return res.status(500).json({
        erro: true,
        mensagem: "Erro ao cancelar o agendamento",
        detalhes: error.message
      });
    }
  }
}

module.exports = appointmentServices