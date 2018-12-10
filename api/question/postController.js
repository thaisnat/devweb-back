const post = require('./postModel');

exports.createPost = (req, res) => {
  const postNew = new post(req.body);
  postNew.save((err, post) => {
    if (err)
      next(err);
    res.status(201).json(post);
  });
};

exports.getPost = function (req, res, next) {
  post.findById(req.paramS.postId, (err, post) => {
    if (err)
      next(err);
    res.status(200).json(post);
  });
};

exports.deletePost = function (req, res, next) {
  post.findByIdAndRemove(req.params.postId, (err, post) => {
    if (err)
      next(err);
    res.status(200).json({ mensagem: "Deleted successfully." });
  });
};
