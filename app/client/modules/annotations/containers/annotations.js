import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import Annotations from '../components/annotations.jsx';

export const composer = ({context}, onData) => {
  const {LocalState, Collections} = context();

  const currentEditingAnnotationId = LocalState.get('annotations.currentEditingAnnotationId');
  const annotations = Collections.Annotations.find().fetch();
  const currentEditingAnnotation = Collections.Annotations.findOne(currentEditingAnnotationId);
  const currentToolId = LocalState.get('annotations.currentToolId');
  onData(null, {currentToolId, currentEditingAnnotation, annotations});
};

export const keyComposer = ({context}, onData) => {
  const {Keypress} = context();
  const altKey = Keypress.is(Keypress.Keys.Alt);
  onData(null, {altKey});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  createAnnotation: actions.annotations.createAnnotation,
  updateAnnotation: actions.annotations.updateAnnotation,
  startNewAnnotation: actions.annotations.startNewAnnotation,
  deleteAnnotation: actions.annotations.deleteAnnotation,
  stopEditingCurrentAnnotation: actions.annotations.stopEditingCurrentAnnotation
});
export default composeAll(
  composeWithTracker(composer),
  composeWithTracker(keyComposer),
  useDeps(depsMapper)
)(Annotations);
