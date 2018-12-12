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
  user.findOnde({ username: req.params.username }, (err, user) => {
    if (err)
      next(err);
    res.status(200).json(user);
  });
};

exports.updateUser = function (req, res, next) {
  user.findOneAndUpdate({ username: req.params.username }, req.body, { new: true }, (err, user) => {
    if (err)
      next(err);
    res.status(200).json(user);
  });
};

exports.deleteUser = function (req, res, next) {
  user.findOneAndRemove({ username: req.params.username }, (err, user) => {
    if (err)
      next(err);
    res.status(200).json({ mensagem: "Deleted successfully." });
  });
};

exports.listUser = function (req, res) {
  user.find((err, user) => {
    if (err)
      res, send(err);
    res.status(200).json(user);
  });
};