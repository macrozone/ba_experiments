import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';
import AnnotationPanelEdit from '../components/annotation_panel_edit.jsx';

export const composer = ({ context }, onData) => {
  const { Meteor, Collections } = context();

  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  deleteAnnotation: actions.threedViewer.deleteAnnotation,
  setAnnotationLabelId: actions.threedViewer.setAnnotationLabelId,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(AnnotationPanelEdit);
