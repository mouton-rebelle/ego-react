var _       = require('lodash');
var conn    = require('monk')('localhost/ego');
var db      = {
  posts  : require('co-monk')(conn.get('posts')),
  images : require('co-monk')(conn.get('images'))
};

const maxPerPage = 30;

var listPostImageIds = function (post)
{
  if (!post.child)
  {
    return [post._id];
  } else {
    return post.child.reduce( (ids,c) => {
      ids.push(...listPostImageIds(c));
      return ids;
    }, []);
  }
};

var replaceImagesInPost = function(post, images)
{
  if (!post.child && post._id)
  {
    post.image = images.filter(function(img){
      return img._id+'' === post._id+'';
    });
  } else {
    post.child = post.child.map( (p) => {
      p = replaceImagesInPost(p,images);
      return p;
    });
    // console.log(post.child);
  }
  return post;
}

module.exports = {
  get: function *(...range)
  {
    var count = Math.min(range[1]-range[0], maxPerPage);
    var posts = yield db.posts.find({},
    {
      sort  : { order: -1},
      limit : count,
      skip  : range[0]
    });
    var total = yield db.posts.count({});

    // gather images _id
    let ids = _.uniq(posts.reduce( (ids, post) => {
      ids.push(...listPostImageIds(post));
      return ids;
    },[]));

    // query images
    var images =  yield db.images.find({_id:{$in:ids}});

    // replace child images in posts
    posts = posts.map( post => {
      return replaceImagesInPost(post, images);
    });


    return {
      posts: posts,
      contentRange: 'posts ' +range[0] + '-' + range[1]+'/'+total,
      partial: posts.length < total
    };
  },
  count: function()
  {
    return  db.posts.count({});
  }
};