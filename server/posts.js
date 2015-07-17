var conn    = require('monk')('localhost/ego');
var db      = {
  posts  : require('co-monk')(conn.get('posts')),
  images : require('co-monk')(conn.get('images'))
};

const maxPerPage = 30;



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

    // replace child images in posts



    return {
      posts: posts,
      contentRange: 'posts ' +range[0] + '-' + (count-range[0])+'/'+total,
      partial: posts.length < total
    };
  },
  count: function()
  {
    return  db.posts.count({});
  }
};