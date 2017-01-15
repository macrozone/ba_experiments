import { Cases } from '/lib/collections';
import { Meteor } from 'meteor/meteor';

export default () => {
  Meteor.publish('cases.one', function (caseId) {
    return Cases.find(caseId);
  });
  Meteor.publish('cases.byType', function (type) {
    return Cases.find({ type });
  });
};
