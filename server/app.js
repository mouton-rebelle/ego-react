var koa       = require('koa');
var Router    = require('koa-router');
var _         = require('lodash');

var postsApi  = require('./posts.js');

var app       = koa();
var router    = new Router();

router.get('/api/post/:id', function *(next){
  this.type   = 'application/json';
  let post  = yield postsApi.getById(this.params.id);
  this.body = JSON.stringify(post);
  this.set('Access-Control-Allow-Origin','*');
});

router.get('/api/posts', function *(next) {

  let range   = _.get(this.request.headers,'range','0-10');
  let [ start = 0, end = 10 ] = range.split('-');

  let { posts, contentRange, partial } = yield postsApi.getByRange(start,end);

  this.type   = 'application/json';
  this.status = partial ? 206 : 200;

  this.set('Content-Range',contentRange);
  this.set('Accept-Ranges','posts');
  this.set('Range-Unit','posts');
  this.set('Access-Control-Allow-Origin','*');
  this.set('Access-Control-Expose-Headers','Content-Type, Content-Range');
  this.body = JSON.stringify(posts);
});

router.options('/api/posts', function *(next){
  this.set('Access-Control-Allow-Origin','*');
  this.set('Access-Control-Allow-Headers','*');
  this.set('Access-Control-Allow-Methods','GET, POST, OPTIONS');
  this.set('Access-Control-Allow-Headers','Content-Type, Range');
  this.set('Access-Control-Max-Age',' 86400');

  this.body = '1';
});


app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8080);