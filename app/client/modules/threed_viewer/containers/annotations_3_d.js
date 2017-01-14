import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';
import Annotations3D from '../components/annotations_3_d.jsx';

export const composer = ({ context, caseId }, onData) => {
  const { Meteor, Collections: { Annotations, Labels } } = context();
  Meteor.subscribe('annotations.forCase', caseId);
  const annotationsWithLabels = Annotations.find({ caseId }).map(
    annotation => ({ annotation, label: Labels.findOne(annotation.labelId) })
  );
  onData(null, { annotationsWithLabels });
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Annotations3D);
