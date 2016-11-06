import RandomColor from 'random-color';

export default {
  createAnnotation({LocalState,Collections: {Annotations}}, type, props) {
    const annotationId = Annotations.insert(
        {type, props, color: RandomColor().rgbString()}
      );
    LocalState.set('annotations.currentEditingAnnotationId', annotationId);
    LocalState.set('annotations.showAnnotations', true);
  },

  updateAnnotation({LocalState,Collections: {Annotations}}, annotationId, modifier) {
    Annotations.update(annotationId, modifier);
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
    LocalState.delete('annotations.currentEditingAnnotationId');
  },
};
