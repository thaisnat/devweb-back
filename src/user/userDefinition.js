const User = require('./userModel');

exports.create = async (data) => {
  const user = new User(data);
  return await user.save();
};

exports.findAll = async () => {
  return await User.find({});
};

exports.findById = async (id) => {
  return await User.findById(id);
};

exports.findByIdAndUpdate = async (userId, data) => {
  return await User.updateOne({ _id: userId }, { $set: data });
};

exports.deleteById = async (userId) => {
  return await User.deleteOne({ _id: userId });
};

exports.findOne = async (data) => {
  return await User.findOne(data);
};

exports.addPost = async (userId, postId) => {
  return await User.updateOne({ _id: userId }, { $addToSet: { _post: postId } });
};

exports.removePost = async (userId, postId) => {
  return await User.updateOne({ _id: userId }, { $pull: { _post: postId } });
};
