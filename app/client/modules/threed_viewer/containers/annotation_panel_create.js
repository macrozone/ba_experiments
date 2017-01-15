import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';
import AnnotationPanelCreate from '../components/annotation_panel_create.jsx';

export const composer = ({ context }, onData) => {
  const { Meteor, LocalState, Collections } = context();
  const currentAnnotationTool = LocalState.get('pet_3d_viewer.currentAnnotationTool');
  const currentLabelId = LocalState.get('labels.currentLabelId');
  onData(null, { currentLabelId, currentAnnotationTool });
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  setCurrentLabel: actions.labels.setCurrent,
  clearCurrentTool: actions.threedViewer.clearCurrentTool,
  startSphereAnnotation: actions.threedViewer.startSphereAnnotation,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(AnnotationPanelCreate);
