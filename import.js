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
  elements : 'SELECT * FROM element WHERE site=? ORDER BY ordre ASC',
  tags     : 'SELECT et.element_id, t.text FROM element_has_tag et LEFT JOIN tag t ON (t.refstr = et.tag_refstr) WHERE site=?',
  comments : 'SELECT c.* FROM comment c LEFT JOIN element e ON (c.element_id=e.id) WHERE site =? ORDER BY created_at'

};

let mongo = {
  users    : mongodb.get('users'),
  elements : mongodb.get('elements'),
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
    re.tags     = tags
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

  let root = elements
    .filter(e => e.parent_id === null)
    .map(e => {
      e.root = true;
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
    if (elem.root || !elem.child)
    {
      console.log(_.fill(Array(lvl),'*').join('') + elem.label);
    }
    if (elem.child)
    {
      lvl = lvl + 1;
      elem.child.forEach(c => { logChild(c,lvl)});
    }
  };
  root.forEach(e => { logChild(e,0);});
  // logChild(root[0],0);
  console.log(cedric._id);
}).catch ( (error) => console.log(error) );