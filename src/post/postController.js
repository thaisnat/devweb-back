const postDefinition = require('./postDefinition');
const userDefinition = require('../user/userDefinition');

const RequestStatus = require('../../services/requests/requestStatus');

exports.index = async (req, res) => {
  try {
    const posts = await postDefinition.findAll();
    res.status(RequestStatus.OK).json(posts);
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};

exports.show = async (req, res) => {
  try {
    const postId = req.params.post_id;
    const post = await postDefinition.findById(postId);

    res.status(RequestStatus.OK).json(post);
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).json(error);
  }
};

exports.createPost = async (req, res) => {
  try {
    const loggedUserId = req.user._id;
    req.body._owner = loggedUserId;

    const postNew = await postDefinition.createPost(req.body);

    await userDefinition.addPost(loggedUserId, postNew._id);

    res.status(RequestStatus.CREATED_STATUS).json({ message: "Post created", data: postNew });
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};

exports.update = async (req, res) => {
  try {
    const postId = req.params.post_id;
    const updated = await postDefinition.findByIdAndUpdate(postId, req.body);

    if (updated.n > 0) {
      if (updated.nModified) {
        res.status(RequestStatus.OK).json({ message: "Update successfully." });
      } else {
        res.status(RequestStatus.OK).json({ message: "Update not successfully." });
      }
    } else {
      res.status(RequestStatus.BAD_REQUEST).json({ message: "Post not founded" });
    }
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).json(error);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.post_id;

    const postDeleted = await postDefinition.deleteById(postId);

    if (postDeleted.n > 0) {
      await userDefinition.removePost(userId, postId);
    }

    res.status(200).json({ mensagem: "Deleted successfully." });

  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
}

