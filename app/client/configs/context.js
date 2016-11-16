import * as Collections from '/lib/collections';
import * as Schemas from '/lib/schemas';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Tracker} from 'meteor/tracker';
import {Keypress} from 'meteor/panter:keypress';
export default function () {
  return {

    Meteor,
    FlowRouter,
    Collections,
    Schemas,
    LocalState: new ReactiveDict(),
    Tracker,
    Keypress,
  };
}
