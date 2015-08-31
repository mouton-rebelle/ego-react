let _       = require('lodash');
let conn    = require('monk')('localhost/ego');
let db      = {
  posts  : require('co-monk')(conn.get('posts')),
  images : require('co-monk')(conn.get('images'))
};

const maxPerPage = 30;

let listPostImageIds = function (post)
{
  if (!post.child)
  {
    return [post._id];
  } else {
    return post.child.reduce( (ids, c) => {
      ids.push(...listPostImageIds(c));
      return ids;
    }, []);
  }
};

let replaceImagesInPost = function(post, images, id)
{
  images = images.map( img => {
    img.postUrl = `/post/${id}`;
    return img;
  });


  if (!post.child && post._id)
  {
    post.image = images.filter(function(img){
      return img._id + '' === post._id + '';
    })[0];
  } else {
    post.child = post.child.map( (p) => {
      p = replaceImagesInPost(p, images, id);
      return p;
    });
    // console.log(post.child);
  }
  return post;
}

module.exports = {
  getById: function *(id)
  {
    let post = yield db.posts.findOne({_id:id});
    let ids  = listPostImageIds(post);
    let images =  yield db.images.find({_id:{$in:ids}});
    return replaceImagesInPost(post, images, id);
  },
  getByRange: function *(...range)
  {
    let count = Math.min(range[1] - range[0], maxPerPage);
    let posts = yield db.posts.find({},
    {
      sort  : { order: -1},
      limit : count,
      skip  : range[0]
    });
    let total = yield db.posts.count({});

    // gather images _id
    let ids = _.uniq(posts.reduce( (cids, post) => {
      cids.push(...listPostImageIds(post));
      return cids;
    },[]));

    // query images
    let images =  yield db.images.find({_id:{$in:ids}});

    // replace child images in posts
    posts = posts.map( post => {
      return replaceImagesInPost(post, images, post._id);
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