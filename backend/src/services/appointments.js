const db = require("../models/db");
const Appointment = require("../models/Appointment");

const appointmentServices = {
  create: async ({ date, petId }, res) => {
      if (!date || !petId)
        return res.json({ erro: true, mensagem: "Faltam informacoes" });

      return Appointment.create({ date, petId }).then((r) =>
        res.json({
          erro: false,
          mensagem: "Consulta para o pet adicionado com sucesso",
          data: r,
        })
      );
  },
  update: async ({ date, id, description }, res) => {
      console.log(id, date, description)
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