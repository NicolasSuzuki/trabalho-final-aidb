const Exam = require("../models_elastic/Exam");
// Exam and result are the same

const examServices = {
  createPetResult: async ({infos, user}, res) => {
      const exam = { ...infos, createBy: user.dataValues.id }; // petId, userId, date, imageId
      return Exam.create(exam)
        .then((r) =>
          res.json({
            erro: false,
            mensagem: "Exame criado com sucesso",
            data: r,
          })
        )
        .catch(() =>
          res.json({
            erro: true,
            mensagem: "Erro ao cadastrar exame",
          })
        );
  },
  updateResult: async ({ examId, imageId }, res) => {
    examToUpdate = await Exam.findOne({ where: { id: examId } });
    examToUpdate.imageId = imageId;
    await examToUpdate.save();
    return res.json(examToUpdate);
  },
  deleteResult: async ({ examId }, res) => {
    examToUpdate = await Exam.findOne({ where: { id: examId } });
    await examToUpdate.destroy();
    return res.json(examToUpdate);
  },
};

module.exports = examServices