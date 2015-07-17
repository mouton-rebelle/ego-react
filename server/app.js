var koa       = require('koa');
var Router    = require('koa-router');
var _         = require('lodash');

var postsApi  = require('./posts.js');

var app       = koa();
var router    = new Router();

router.get('/api/posts', function *(next) {

  let range   = _.get(this.request.headers,'range','0-10');
  let [ start = 0, end = 10 ] = range.split('-');

  let { posts, contentRange, partial } = yield postsApi.get(start,end);

  this.type   = 'application/json';
  this.status = partial ? 206 : 200;

  this.set('Content-Range',contentRange);
  this.set('Accept-Ranges','posts');
  this.set('Range-Unit','posts');

  this.body = JSON.stringify(posts);
});



app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8080);