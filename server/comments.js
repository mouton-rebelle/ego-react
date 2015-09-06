/*eslint-env node */
let _       = require('lodash');
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
    console.log(comment);
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
