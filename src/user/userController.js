const user = require("./userModel");
const userDefinition = require('../user/userDefinition');
const postDefinition = require('../post/postDefinition');

const RequestStatus = require('../../services/requests/requestStatus');
const RequestMsgs = require('../../services/requests/requestMsgs');

exports.index = async (req, res) => {
  try {
    const users = await userDefinition.findAll();
    res.status(RequestStatus.OK).json(users);
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};

exports.show = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const user = await userDefinition.findById(userId);

    res.status(RequestStatus.OK).json(user);
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).json(error);
  }
};

exports.createUser = async (req, res) => {
  var user = new User(req.body);
  user.name = req.body.username;

  user.generateHash(req.body.password)
    .then((hash) => {
      user.password = hash;
      user.save((err, createdUser) => {
        if (err && err.name === 'MongoError' && err.code === 11000) {
          res.status(RequestStatus.FORBIDDEN).json(RequestMsgs.DUPLICATED_ENTITY);
        } else if (err) {
          res.status(RequestStatus.BAD_REQUEST).json(err);
        } else {
          res.status(RequestStatus.CREATED_STATUS).json({ result: createdUser, msg: 'User created.' });
        }
      });
    })
    .catch((error) => {
      res.status(RequestStatus.BAD_REQUEST).json(err);
    });
};

exports.getUser = function (req, res, next) {
  user.findOnde({ username: req.params.username }, (err, user) => {
    if (err)
      next(err);
    res.status(200).json(user);
  });
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const updatedUser = await userDefinition.findByIdAndUpdate(userId, req.body);

    if (updatedUser.n > 0) {
      if (updatedUser.nModified) {
        res.status(RequestStatus.OK).json({ message: "User updated" });
      } else {
        res.status(RequestStatus.OK).json({ message: "User not updated" });
      }
    } else {
      res.status(RequestStatus.BAD_REQUEST).json({ message: "User not founded" });
    }
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).json(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.user_id;

    const user = await userDefinition.findById(userId);
    const userDeleted = await userDefinition.deleteById(userId);

    if (userDeleted.n > 0) {
      user._posts.forEach(async function
        (postId) {
        const postDeleted = await postDefinition.deleteById(postId);

        if (postDeleted.n > 0) {
          userDefinition.removePost(postId);
        }
      });

      if (req.user) {
        if (req.user._id == userId) {
          req.logout();
        }
      }

      res.status(RequestStatus.OK).json({ message: "User deleted." });
    } else {
      res.status(RequestStatus.BAD_REQUEST).json({ message: "User not founded." });
    }
  } catch (error) {
    console.log(error);
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};