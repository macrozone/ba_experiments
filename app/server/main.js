import publications from './publications';
import methods from './methods';
import {Meteor} from 'meteor/meteor';
import {HttpBasicAuth} from 'meteor/jabbslad:basic-auth';
publications();
methods();


if (Meteor.settings.auth) {
  var basicAuth = new HttpBasicAuth(Meteor.settings.auth.username, Meteor.settings.auth.password);
  basicAuth.protect();
}
