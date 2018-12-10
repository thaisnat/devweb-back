
module.exports = function (app) {
  const post = require('./postController');

  app.route('/post')
  .post(post.createPost);

  app.route('/post/:postId')
  .get(post.getPost)
  .delete(post.deletePost);

};
