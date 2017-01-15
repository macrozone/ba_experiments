import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';
import Annotations3D from '../components/annotations_3_d.jsx';

export const composer = ({ context, caseId }, onData) => {
  const { LocalState, Meteor, Collections: { Annotations, Labels } } = context();
  Meteor.subscribe('annotations.forCase', caseId);
  const annotationsWithLabels = Annotations.find({ caseId }).map(
    annotation => ({ annotation, label: Labels.findOne(annotation.labelId) })
  );
  const selectedAnnotationId = LocalState.get('pet_3_d_viewer.selectedAnnotationId');
  onData(null, { selectedAnnotationId, annotationsWithLabels });
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  selectAnnotation: actions.threedViewer.selectAnnotation,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Annotations3D);
