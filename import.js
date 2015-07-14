let _        = require('lodash');
let co       = require('co');
const config = require('./config');
let mysql    = require('co-mysql')(require('mysql').createConnection({
  host     : 'localhost',
  user     : config.mysql.user,
  password : config.mysql.password,
  database : config.mysql.db,
}));
let mongodb = require('monk')('localhost/ego');
const SITE  = config.site;

let queries = {
  elements : 'SELECT * FROM element WHERE site=?  ORDER BY ordre ASC',
  tags     : 'SELECT et.element_id, t.text FROM element_has_tag et LEFT JOIN tag t ON (t.refstr = et.tag_refstr) WHERE site=?',
  comments : 'SELECT c.* FROM comment c LEFT JOIN element e ON (c.element_id=e.id) WHERE site =? ORDER BY created_at'

};

let mongo = {
  users    : mongodb.get('users'),
  images   : mongodb.get('images'),
  posts    : mongodb.get('posts'),
  tags     : mongodb.get('tags'),
  comments : mongodb.get('comments')
}


co(function *(){
  yield mongo.users.drop();
  let cedric = yield mongo.users.insert({
    firstname : 'Cédric',
    lastname  : 'Fontaine',
    email     : 'cf@eg0.me'
  });
  // yield mongo.elements.drop();
  let elements = yield mysql.query(queries.elements,[SITE]);
  let tags     = yield mysql.query(queries.tags,[SITE]);
  let comments = yield mysql.query(queries.comments,[SITE]);
  elements.map( function(re) {
    delete re.site;
    delete re.ordre;
    delete re.active;
    delete re.view_count;
    delete re.updated_at;
    if (re.type === '2')
    {
      delete re.file;
      delete re.taken_on;
      delete re.lens_id;
      delete re.tags;
      delete re.width;
      delete re.height;
      delete re.file;
    } else {
      re.ratio = re.width/re.height;
      re.tags = tags
        .filter(t=>t.element_id==re.id)
        .map(t=>t.text);
    }
    if (re.parent_id === null)
    {
      re.comments = comments
        .filter(c=>c.element_id==re.id)
        .map(c => {return {text:c.text,author:c.signature,when:c.created_at}});
    }

    return re;
  });

  let posts = elements
    .filter(e => e.parent_id === null)
    .map(e => {
      if (e.style)
      {
        let child = elements.filter(c => c.parent_id === e.id);
        let layout = e.style.split("\r\n");
        let res = {};
        child.forEach( (c,indice)=>{
          res[(indice+1)] = c;
        });

        layout.forEach( (l,indice) =>{
          let [first,orientation,sec] = l.split('.');
          let mesh = {
            horizontal: orientation === 'h',
            child:[res[first],res[sec]]
          }
          res['m'+(indice+1)] = mesh;
        });
        let final = res['m'+(_.size(layout))];
        e.child = final.child;
        e.horizontal = final.horizontal;
      }
     return e;
    });

  let logChild = function(elem,lvl)
  {
    if ( !elem.child)
    {
      console.log(_.fill(Array(lvl),'*').join('') + elem.label);
    }
    if (elem.child)
    {
      lvl = lvl + 1;
      elem.child.forEach(c => { logChild(c,lvl)});
    }
  };


  let flatten = function(post)
  {
    let finalChilds = [];
    post.child.forEach(cp=>{
      if (cp.child)
      {
        flatten(cp);
        if (cp.horizontal === post.horizontal)
        {
          cp.child.forEach(ccp=>{
            finalChilds.push(ccp);
          })
        } else {
          finalChilds.push(cp);
        }
      } else {
        finalChilds.push(cp);
      }
    });

    post.child = finalChilds;
    return post;
  }

  // define the ratio (invariant) of each mesh depending on their orientation, and the respective weight of each of their childs (for horiz only)
  let calculateWeight = function(post)
  {
    if (post.child)
    {
      post.child.map( calculateWeight );
      let width  = 1000;
      let height = 1000;
      if (post.horizontal)
      {
        // all child resized to 1000 height, what's the width ?
        width = post.child.reduce( (width, element) => {
          return width + 1000*element.ratio;
        }, 0);
      } else {
        // all child resized to 1000 width, what's the width ?
        height = post.child.reduce( (height, element) => {
          return height + 1000/element.ratio;
        }, 0);
      }

      post.ratio = width/height;

      if (post.horizontal)
      {
        post.child.map( c => {
          c.weight = (1000*c.ratio) / width * 100;
          return c;
        });
      } else {
        post.child.map( c => {
          c.weight = 100;
          return c;
        });
      }

      return post;
    }
  }

  posts.map(flatten).map(calculateWeight);
  posts.forEach(logChild,0);
  posts.forEach( p => console.log(JSON.stringify(p)));
  console.log(cedric._id);
}).catch ( (error) => console.log(error) );