/*eslint-env node */
let _        = require('lodash');
let co       = require('co');
const config = require('./config');
let mongodb = require('monk')('localhost/ego');

let mongo = {
  posts    : mongodb.get('posts'),
  comments : mongodb.get('comments')
};

co(function *(){
  try{
    yield mongo.comments.drop();
  } catch (err)
  {
    console.log(err);
  }

  let posts = yield mongo.posts.find();
  yield posts.map( post => {
    return function *(){
      if (post.comments && post.comments.length)
      {
        yield post.comments.map(com => {
          return function *()
          {
            com.post = post._id;
            yield mongo.comments.insert(com);
          };
        });
        post.comments = post.comments.map( com => com._id);
        yield mongo.posts.update(post._id, post);
      }
    };
  });

}).catch ( (error) => console.log(error.stack) );
