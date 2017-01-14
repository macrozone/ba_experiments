import { Labels } from '/lib/collections';
import { Meteor } from 'meteor/meteor';

export default () => {
  Meteor.publish('labels.all', function () {
    return Labels.find({});
  });
};
