import { resetDatabase } from 'meteor/xolvio:cleaner';
import _ from 'lodash';
import Labels from '/lib/collections/labels';

import Cases from '/lib/collections/cases';
import Annotations from '/lib/collections/annotations';
import importBuffers from './import_buffers';

const importSeedDump = (filename, collection) => {
  const entries = _(
    Assets.getText(`db-seeds/${filename}`).split('\n')
  )
  .filter(line => !_.isEmpty(line))
  .map((line) => {
    try {
      return JSON.parse(line);
    } catch (error) {
      console.log(`could not parse in filename: ${filename}: '${line}'`);
    }
  }).filter(line => !_.isEmpty(line))
  .value();

  entries.forEach(doc => collection.insert(doc, { validate: false }));
};


Migrations.add({
  version: 1,
  up() {
    importSeedDump('labels.json', Labels);
    importSeedDump('cases.json', Cases);
    importSeedDump('annotations.json', Annotations);
    importBuffers();
  },
});

Meteor.startup(() => {
  if (Meteor.isTest) {
    resetDatabase(null);
  }
  Migrations.migrateTo('latest');
});
