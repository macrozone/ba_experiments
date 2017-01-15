import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';
import AnnotationPanel from '../components/annotation_panel.jsx';

export const composer = ({ context, caseId }, onData) => {
  const { LocalState, Meteor, Collections } = context();
  const _id = LocalState.get('pet_3_d_viewer.selectedAnnotationId');
  Meteor.subscribe('annotations.forCase', caseId);
  const selectedAnnotation = Collections.Annotations.findOne({ _id, caseId });
  onData(null, { selectedAnnotation });
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(AnnotationPanel);
