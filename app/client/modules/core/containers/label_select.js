import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';
import LabelSelect from '../components/label_select.jsx';

export const composer = ({ context, labelId }, onData) => {
  const { Meteor, Collections } = context();
  if (Meteor.subscribe('labels.all').ready()) {
    const labels = Collections.Labels.find({}, { sort: { position: 1 } }).fetch();
    onData(null, { labelId, labels });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(LabelSelect);
