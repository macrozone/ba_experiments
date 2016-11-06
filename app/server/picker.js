import fs from 'fs';
import {Picker} from 'meteor/meteorhacks:picker';
import mime from 'mime-types';
var zlib = require('zlib');

const {assetPath} = Meteor.settings;

Picker.route('/asset/:path*', function (params, req, res) {
  const fullPath = assetPath + '/' + params.path;
  fs.exists(fullPath, function (exists) {
    if (!exists) {
      // 404 missing files
      console.log('file not found:', fullPath);
      res.writeHead(404, {'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
   // set the content type

    const contentType = mime.lookup(fullPath);
    res.writeHead(200, {'Content-Type': contentType });
   // stream the file
    fs.createReadStream(fullPath).pipe(res);
  });

});


Picker.route('/buffers/:path*', function (params, req, res) {
  const fullPath = assetPath + '/buffers/' + params.path;
  fs.exists(fullPath, function (exists) {
    if (!exists) {
      // 404 missing files
      console.log('file not found:', fullPath);
      res.writeHead(404, {'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',

    });
   // stream the file

    fs.createReadStream(fullPath).pipe(res);
  });

});
