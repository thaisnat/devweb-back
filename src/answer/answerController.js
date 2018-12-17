const answerDefinition = require('./answerDefinition');
const userDefinition = require('../user/userDefinition');

const RequestStatus = require('../../services/requests/requestStatus');

exports.index = async (req, res) => {
  try {
    const answers = await answerDefinition.findAll();
    res.status(RequestStatus.OK).json(answers);
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};

exports.show = async (req, res) => {
  try {
    const answerId = req.params.answer_id;
    const answer = await answerDefinition.findById(answerId);

    res.status(RequestStatus.OK).json(answer);
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).json(error);
  }
};

exports.createAnswer = async (req, res) => {
  try {

    const answerNew = await answerDefinition.create(req.body);
    const loggedUserId = req.user._id;
    req.body._owner = loggedUserId;

    await userDefinition.addanswer(userId);

    res.status(RequestStatus.CREATED_STATUS).json({ message: "Answer created", data: answerNew });

  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};

exports.update = async (req, res) => {
  try {
    const answerId = req.params.answer_id;
    const updated = await answerDefinition.findByIdAndUpdate(answerId, req.body);

    if (updated.n > 0) {
      if (updated.nModified) {
        res.status(RequestStatus.OK).json({ message: "Update successfully." });
      } else {
        res.status(RequestStatus.OK).json({ message: "Update not successfully." });
      }
    } else {
      res.status(RequestStatus.BAD_REQUEST).json({ message: "Answer not founded" });
    }
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).json(error);
  }
};

exports.deleteAnswer = async (req, res) => {
  try {
    const answerId = req.params.answer_id;
    const answer = await answerDefinition.findById(answerId);
    const answerDeleted = await answerDefinition.deleteById(answerId);

    if (answerDeleted.n > 0) {
      await userDefinition.removeAnswer(userId, answerId);
    }

    res.status(200).json({ mensagem: "Deleted successfully." });

  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
}

