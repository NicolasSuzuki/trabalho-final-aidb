const db = require("../models_elastic/db");
const Appointment = require("../models_elastic/Appointment");

const appointmentServices = {
  create: async ({ date, petId }, res) => {
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
            createdAt: new Date() // Adding a created timestamp if needed
          }
        });
  
        console.log('Result:', result);
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
      const appointment = await Appointment.findOne({ where: { id: id } });
      appointment.date = date;
      appointment.description = description;
      await appointment.save();
      return res.json(appointment);
  },
  cancelAppointment: async ({ appointmentId }, res) => {
      appointment = await Appointment.findOne({ where: { id: appointmentId } });
      appointment.deletedAt = Date.now();
      await appointment.save();
      return res.json(appointment);
  }
}

module.exports = appointmentServices