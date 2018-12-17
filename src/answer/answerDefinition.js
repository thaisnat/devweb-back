const Answer = require('./answerModel');

exports.createAnswer = async (data) => {
  const answer = new Answer(data);
  return await answer.save();
};

exports.findAll = async () => {
  return await Answer.find({});
};

exports.findById = async (id) => {
  return await Answer.findById(id);
};

exports.findByIdAndUpdate = async (answerId, data) => {
  delete data.bodyText;

  return await Answer.updateOne({ _id: answerId }, { $set: data });
};

exports.deleteById = async (id) => {
  return await Answer.deleteOne({ _id: id });
};

exports.findOne = async (data) => {
  return await Answer.findOne(data);
};