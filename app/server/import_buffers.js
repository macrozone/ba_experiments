import { Meteor } from 'meteor/meteor';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

import Cases from '/lib/collections/cases';
export default () => {
  const { assetPath } = Meteor.settings;
  const dirname = `${assetPath}/buffers/`;

  fs.readdir(dirname, Meteor.bindEnvironment((err, filenames) => {
    if (err) {
      console.error(`error occured while reading ${dirname}`);
      return;
    }
    filenames.forEach(Meteor.bindEnvironment((filename) => {
      if (path.extname(filename) === '.buf') {
        console.log('importing', filename);
        const basename = path.basename(filename, path.extname(filename));
        const parts = basename.split('_');
        const [depth, width, height] = _.takeRight(parts, 3).map(Number);

        const title = _.take(parts, 2).join('_');
        const type = parts.length === 6 ? parts[2] : 'pet';

        // find min/max suv values
        fs.readFile(`${dirname}/${filename}`, Meteor.bindEnvironment((error, buffer) => {
          if (error) {
            throw new Error(error);
          }
          const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
          const array = new Float32Array(arrayBuffer);
          const min = _.min(array);
          const max = _.max(array);
          const data = {
            file: `/buffers/${filename}`,
            min,
            max,
          };
          console.log('import case', { type, title });
          const _id = `${title}_${type}`;
          Cases.upsert({ _id }, { $set: { type, title, depth, width, height, data } });
        }));
      }
    }));
  }));
};
