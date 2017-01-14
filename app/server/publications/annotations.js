import { Annotations } from '/lib/collections';
import { Meteor } from 'meteor/meteor';

export default () => {
  Meteor.publish('annotations.forCase', function (caseId) {
    return Annotations.find({ caseId });
  });
};
