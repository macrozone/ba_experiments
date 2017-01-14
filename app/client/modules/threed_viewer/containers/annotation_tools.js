import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';
import AnnotationTools from '../components/annotation_tools.jsx';

export const composer = ({ context }, onData) => {
  const { Meteor, LocalState, Collections } = context();
  const currentAnnotationTool = LocalState.get('pet_3d_viewer.currentAnnotationTool');
  onData(null, { currentAnnotationTool });
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  clearCurrentTool: actions.threedViewer.clearCurrentTool,
  startSphereAnnotation: actions.threedViewer.startSphereAnnotation,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(AnnotationTools);
