let _        = require('lodash');
let co       = require('co');
let mongodb  = require('monk')('localhost/ego');
let fs       = require('fs');
var gm = require('gm').subClass({imageMagick: true});

let mongo = {
  users    : mongodb.get('users'),
  images   : mongodb.get('images'),
  posts    : mongodb.get('posts'),
  tags     : mongodb.get('tags'),
  comments : mongodb.get('comments')
};

let metas = {
  // date: '%[EXIF:DateTimeOriginal]',
  // tags: '%[IPTC:2:25]',
  aperture: '%[EXIF:ApertureValue]',
  speed: '%[EXIF:ShutterSpeedValue]',
  iso: '%[EXIF:ISOSpeedRatings]',
  bias: '%[EXIF:ExposureBiasValue]',
  apn: '%[EXIF:Model]'
};


function getExif(filename, meta) {
  return new Promise( (resolve, reject) => {
    if (!fs.existsSync(filename))
    {
      resolve({});
    }
    gm(filename).identify(meta, (error, data) => {
      if (error)
      {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

function batch(pos)
{
  return new Promise( (resolve, reject) => {
    co(function* () {
      let images = yield mongo.images.find({}, { limit : 50, skip: pos} );
      (yield images.map( img => {
        return function *(){
          let filename = './orig/' + img.file;
          (yield _.map(metas, (meta, key) => {
            return function *(){
              img[key] = yield getExif(filename, meta);
            };
          }));
          yield mongo.images.updateById(img._id, img);
        };
      }));
      return images;
    }).then(
      images => {
        if (images.length === 50)
        {
          console.log(pos);
          return batch(pos + 50);
        } else {
          resolve('all done');
        }
      },
      error => {
        console.log(error);
      }
    );
  });
}

batch(0);


// mongo.images.find({}, { limit : 10, skip: 4000} ).then( images => {
//   images.map(img => {
//     let filename = './orig/' + img.file;
//     _.map(metas, (meta, key) => {
//       getExif(filename, meta).then(d=>{
//         console.log(`${key} => ${d}`);
//       });
//     });
//   });
// });
