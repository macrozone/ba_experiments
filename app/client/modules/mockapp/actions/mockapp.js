import RandomColor from 'random-color';
import faker from 'faker';
export default {
  draw({LocalState,Collections: {Annotations}}, annotationId, x, y) {
    if (!annotationId) {
      annotationId = Annotations.insert({points: [], color: RandomColor().rgbString()});
      LocalState.set('mockapp.currentAnnotationId', annotationId);
      LocalState.set('mockapp.showAnnotations', true);
    }
    Annotations.update(annotationId, {$push: {points: {$each: [ x,y ]}}});
  },
  startNewAnnotation({Collections: {Annotations}, LocalState}) {
    const annotationId = Annotations.insert({points: [], color: RandomColor().rgbString()});
    LocalState.set('mockapp.currentAnnotationId', annotationId);
    LocalState.set('mockapp.showAnnotations', true);
  },
  stopCurrentAnnotation({LocalState}) {
    LocalState.delete('mockapp.currentAnnotationId');
  },
  toggleAnnotations({LocalState}) {
    const showAnnotations = LocalState.get('mockapp.showAnnotations');
    LocalState.set('mockapp.showAnnotations', !showAnnotations);
  },
  deleteAnnotation({LocalState, Collections: {Annotations}}, annotationId) {
    Annotations.remove(annotationId);
  },
  nextSample({LocalState, Collections: {Annotations}}) {
    LocalState.set('mockapp.currentImage', faker.random.image());
    LocalState.set('samplesDone', (LocalState.get('samplesDone') || 0) + 1);
  },
  setCTSample({LocalState, Collections: {Annotations}}) {
    LocalState.set('samplesDone', (LocalState.get('samplesDone') || 0) + 1);
    LocalState.set(
      'mockapp.currentImage',
      'https://www.radiologie-leipzig.de/files/images/content/computertomographie/11_ct-abdomen.jpg'
    );

  }
};
