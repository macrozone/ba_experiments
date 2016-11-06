import { FilesCollection } from 'meteor/panter:ostrio-files';

const AnnotationBitmaps = new FilesCollection({
  collectionName: 'AnnotationBitmaps',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: function (file) {
    return true;
  }
});


export default AnnotationBitmaps;
