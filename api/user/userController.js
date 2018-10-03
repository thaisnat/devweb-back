const user = require("./userModel");

exports.createUser = (req, res) => {
  const userNew = new user(req.body);
  userNew.save((err, user) => {
    if (err)
      next(err);
    res.status(201).json(user);
  });
};

exports.getUser = function (req, res, next) {
  user.findById(req.params.userId, (err, user) => {
    if (err)
      next(err);
    res.status(200).json(user);
  });
};

exports.updateUser = function (req, res, next) {
  user.findByIdAndUpdate(req.params.userId, req.body, { new: true }, (err, user) => {
    if (err)
      next(err);
    res.status(200).json(user);
  });
};

exports.deleteUser = function (req, res, next) {
  user.findByIdAndRemove(req.params.userId, (err, user) => {
    if (err)
      next(err);
    res.status(200).json({ mensagem: "Deleted successfully." });
  });
};