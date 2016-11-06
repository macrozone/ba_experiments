import {AnnotationBitmaps} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
export default () => {
  Meteor.publish('annotationBitmaps.all', function () {
    return AnnotationBitmaps.find().cursor;
  });
};
