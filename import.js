let _        = require('lodash');
let co       = require('co');
let php      = require('phpjs');
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


function getDefaultStyle(nb)
  {
  switch (nb)
  {
    case 1:
      return '1.h.2';
    case 2:
      return '1.h.2';
    case 3:
      return "2.v.3\r\nm1.h.1";
    case 4:
      return "1.v.2\r\n3.v.m1\r\nm2.h.4";
    case 5:
      return "1.h.2\r\n3.h.4\r\nm1.v.m2\r\nm3.v.5";
    case 6:
      return "1.h.2\r\n3.h.4\r\nm1.v.m2\r\n5.h.6\r\nm3.v.m4";
    case 7:
      return "1.h.2\r\n3.h.4\r\n5.h.6\r\nm1.v.m2\r\nm3.h.7\r\nm4.v.m5";
    case 8:
      return "1.h.2\r\n3.h.4\r\n5.h.6\r\nm1.v.m2\r\nm3.h.7\r\nm4.v.m5\r\nm6.v.8";
    case 9:
      return "1.h.2\r\n3.h.4\r\n5.h.6\r\n7.h.8\r\nm1.v.m2\r\nm3.v.m4\r\nm5.h.m6\r\nm7.v.9";
    case 10:
      return "1.h.2\r\n3.h.4\r\n5.h.6\r\n7.h.8\r\nm1.v.m2\r\nm3.v.m4\r\nm5.h.m6\r\nm7.v.9\r\nm8.h.10";
    default:
      throw "UNHANDLED : " + nb;
  }
}



co(function *(){
  try{
    yield mongo.users.drop();
    yield mongo.images.drop();
    yield mongo.posts.drop();
  } catch (err)
  {

  }
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
    delete re.active;
    delete re.view_count;
    delete re.updated_at;
    if (re.parent_id)
    {
      delete re.ordre;
    }
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
      delete re.style;
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

  yield elements
    .filter( e => e.type*1 === 1)
    .map( e => {
      e.users_id = cedric._id;

      return mongo.images.insert(e);
    });

  let posts = elements
    .filter(e => e.parent_id === null)
    .map(e => {
      let child = elements.filter(c => c.parent_id === e.id);
      if (!e.style && child.length>1)
      {
        try {
          e.style = getDefaultStyle(child.length);
        } catch (err)
        {
          throw e.label;
        }
      }
      if (e.style)
      {
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
    console.log(post);
    if (post.child)
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

    }
    return post;
  };

  // define the ratio (invariant) of each mesh depending on their orientation, and the respective weight of each of their childs (for horiz only)
  let calculateWeight = function(post)
  {
    delete post.style;
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
        // all child resized to 1000 width, what's the height ?
        height = post.child.reduce( (height, element) => {
          return height + 1000/element.ratio;
        }, 0);
      }

      post.ratio = width/height;

      if (post.horizontal)
      {
        post.child.map( function(c) {

          c.weight = (1000*c.ratio) / width * 100;
          if (c.type*1 === 1)
          {
            delete c.id;
            delete c.parent_id;
            delete c.label;
            delete c.description;
            delete c.type;
            delete c.taken_on;
            delete c.width;
            delete c.height;
            delete c.lens_id;
            delete c.file;
            delete c.created_at;
            delete c.ratio;
            delete c.tags;
            delete c.users_id;
          }
          return c;
        });
      } else {
        post.child.map( function(c) {
          c.weight = 100;
          if (c.type*1===1)
          {
            delete c.id;
            delete c.parent_id;
            delete c.label;
            delete c.description;
            delete c.type;
            delete c.taken_on;
            delete c.width;
            delete c.height;
            delete c.lens_id;
            delete c.file;
            delete c.created_at;
            delete c.ratio;
            delete c.tags;
            delete c.users_id;
          }
          return c;
        });
      }
      return post;
    } else {
      if (post.parent_id === null)
      {
        post.child = [{
          _id: mongo.images.id(post._id),
          weight: 100
        }];
        post.oldUrl = '/photo/' + post.id + '/' + php.str_replace([' ','.', '?', '/',','],['_','','','','_'],post.label);
        delete post._id;
        delete post.id;
        delete post.parent_id;
        delete post.type;
        delete post.taken_on;
        delete post.width;
        delete post.height;
        delete post.lens_id;
        delete post.file;
        delete post.tags;
        delete post.users_id;
      }
      return post;
    }
  };

  posts = posts.map(flatten).map(calculateWeight);
  yield posts.map( p => mongo.posts.insert(p));

  yield mongo.posts.update({},{ $rename : {
    created_at:'createdAt',
    label:'title',
    ordre:'order',
    description:'desc'
  }},{multi:true});
  // posts.forEach( p => console.log(JSON.stringify(p)));
  yield mongo.images.update({},{ $rename : {
    taken_on:'takenOn'
  }},{multi:true});

  console.log(cedric._id);
}).catch ( (error) => console.log(error.stack) );