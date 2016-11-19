import { useDeps, compose, composeAll, composeWithTracker } from 'mantra-core';
import Pet3DViewer from '../components/pet_3_d_viewer.jsx';

export const composer = ({ context, caseId }, onData) => {
  const { Meteor, LocalState, Collections } = context();
  // case is a reserved word...
  const currentCase = Collections.Cases.findOne(caseId);
  onData(null,
    { caseId, currentCase });
};

export const keyComposer = ({ context, handleAnnotationKeyPress }, onData) => {
  window.addEventListener('keydown', handleAnnotationKeyPress, true);
  onData(null, {});
  return () => (window.removeEventListener('keypress', handleAnnotationKeyPress));
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  setCameraRay: actions.threedViewer.setCameraRay,
  handleAnnotationToolClick: actions.threedViewer.handleAnnotationToolClick,
  handleAnnotationKeyPress: actions.threedViewer.handleAnnotationKeyPress,
  setCamera: actions.threedViewer.setCamera,
});

export default composeAll(
  composeWithTracker(composer),
  compose(keyComposer),
  useDeps(depsMapper)
)(Pet3DViewer);
