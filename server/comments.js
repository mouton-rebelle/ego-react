/*eslint-env node */
let conn    = require('monk')('localhost/ego');
let db      = {
  comments : require('co-monk')(conn.get('comments')),
  posts    : require('co-monk')(conn.get('posts'))
};

module.exports = {

  getByPostId: function *(id)
  {
    return yield db.comments.find({post:db.posts.id(id)});
  },

  save: function *(comment)
  {
    comment.post = db.posts.id(comment.post);
    comment.when = new Date();
    yield db.comments.insert(comment);
    yield db.posts.updateById(comment.post,
      {
        $push:
          {
            comments: comment._id
          }
      }
    );
    return comment;
  },

  getRecents: function *()
  {
    let comments = yield db.comments.find({},
    {
      sort  : { when: -1},
      limit : 10,
      skip  : 0
    });
    return comments;
  }
};
