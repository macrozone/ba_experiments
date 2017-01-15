import { HttpBasicAuth } from 'meteor/jabbslad:basic-auth';
import { Meteor } from 'meteor/meteor';


import methods from './methods';
import publications from './publications';

publications();
methods();

if (Meteor.settings.auth) {
  const basicAuth = new HttpBasicAuth(Meteor.settings.auth.username, Meteor.settings.auth.password);
  basicAuth.protect();
}
