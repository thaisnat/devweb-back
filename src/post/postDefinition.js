const Post = require('./postModel');

exports.createPost = async (data) => {
  const post = new Post(data);
  return await post.save();
};

exports.findAll = async () => {
  return await Post.find({});
};

exports.findById = async (id) => {
  return await Post.findById(id);
};

exports.findByIdAndUpdate = async (postId, data) => {
  delete data.bodyText;
  delete data.discipline;

  return await Post.updateOne({ _id: postId }, { $set: data });
};

exports.deleteById = async (id) => {
  return await Post.deleteOne({ _id: id });
};

exports.findOne = async (data) => {
  return await Post.findOne(data);
};