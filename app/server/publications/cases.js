import {Cases} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
export default () => {
  Meteor.publish('cases.all', function () {
    return Cases.find();
  });
};
