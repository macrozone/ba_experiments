import RandomColor from 'random-color';

export default {
  drawPolygon({LocalState,Collections: {Annotations}}, x, y) {
    let annotationId = LocalState.get('annotations.currentEditingAnnotationId');
    const annotation = Annotations.findOne(annotationId);
    console.log(annotation, annotationId);
    if (!annotation) {

      annotationId = Annotations.insert(
        {type: 'polygon', props: {points: []}, color: RandomColor().rgbString()}
      );
      LocalState.set('annotations.currentEditingAnnotationId', annotationId);
      LocalState.set('annotations.showAnnotations', true);
    }
    Annotations.update(annotationId, {$push: {'props.points': {$each: [ x,y ]}}});
  },

  stopEditingCurrentAnnotation({LocalState}) {

    LocalState.delete('annotations.currentEditingAnnotationId');
  },
  toggleAnnotations({LocalState}) {
    const showAnnotations = LocalState.get('annotations.showAnnotations');
    LocalState.set('annotations.showAnnotations', !showAnnotations);
  },
  deleteAnnotation({LocalState, Collections: {Annotations}}, annotationId) {
    Annotations.remove(annotationId);
  },

  activateTool({LocalState}, toolId) {
    LocalState.set('annotations.currentToolId', toolId);
  }
};
