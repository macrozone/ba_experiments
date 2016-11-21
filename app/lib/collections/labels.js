import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const Labels = new Meteor.Collection('labels');

Labels.attachSchema(new SimpleSchema({
  name: {
    type: String
  },
  color: {
    type: String
  }
}));

export default Labels;
