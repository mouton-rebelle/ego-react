/*eslint-env node */
var koa         = require('koa');
var Router      = require('koa-router');
var _           = require('lodash');
var serve       = require('koa-static');
var postsApi    = require('./posts.js');
var commentsApi = require('./comments.js');
var bodyParser  = require('koa-bodyparser');

var app         = koa();
var router      = new Router();

app.use(serve('public'));
app.use(serve('orig'));
app.use(bodyParser());

router.get('/api/comments/post/:id', function *(next){
  this.type    = 'application/json';
  let comments = yield commentsApi.getByPostId(this.params.id);
  this.body    = JSON.stringify(comments);
  this.set('Access-Control-Allow-Origin', '*');
});

router.get('/api/post/:id', function *(next){
  this.type = 'application/json';
  let post  = yield postsApi.getById(this.params.id);
  this.body = JSON.stringify(post);
  this.set('Access-Control-Allow-Origin','*');
});

router.post('/api/comments', function *(next){
  this.type   = 'application/json';
  let comment = yield commentsApi.save(this.request.body);
  this.body   = JSON.stringify(comment);
});

router.get('/api/posts', function *(next) {

  let range   = _.get(this.request.headers,'range','0-10');
  let [ start = 0, end = 10 ] = range.split('-');

  let { posts, contentRange, partial } = yield postsApi.getByRange(start, end);

  this.type   = 'application/json';
  this.status = partial ? 206 : 200;

  this.set('Content-Range', contentRange);
  this.set('Accept-Ranges', 'posts');
  this.set('Range-Unit', 'posts');
  this.set('Access-Control-Allow-Origin', '*');
  this.set('Access-Control-Expose-Headers', 'Content-Type, Content-Range');
  this.body = JSON.stringify(posts);
});

router.options('*', function *(next){
  this.set('Access-Control-Allow-Origin', '*');
  this.set('Access-Control-Allow-Headers', '*');
  this.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  this.set('Access-Control-Allow-Headers', 'Content-Type, Range');
  this.set('Access-Control-Max-Age', '86400');

  this.body = '1';
});


router.get('/admin/*', function *(next){
  this.body = `<html>
    <head>
      <link href='http://fonts.googleapis.com/css?family=Roboto+Mono:400,300,700' rel='stylesheet' type='text/css'>
      <title>eg0</title>
    </head>
    <body class="admin">
      <div class="content" id="root">
      </div>
    </body>
    <script src="http://localhost:3000/static/admin_bundle.js"></script>

  </html>`;
});

router.get('*', function *(next){
  this.body = `<html>
    <head>
      <link href='http://fonts.googleapis.com/css?family=Roboto+Mono:400,300,700' rel='stylesheet' type='text/css'>
      <title>eg0</title>
    </head>
    <body>
      <div class="content" id="root">
      </div>
    </body>
    <script src="http://localhost:3000/static/ego_bundle.js"></script>

  </html>`;
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8080);