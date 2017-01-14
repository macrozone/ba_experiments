import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';
import LabelSelect from '../components/label_select.jsx';

export const composer = ({ context }, onData) => {
  const { Meteor, Collections, LocalState } = context();
  if (Meteor.subscribe('labels.all').ready()) {
    const currentLabelId = LocalState.get('labels.currentLabelId');
    const labels = Collections.Labels.find().fetch();
    onData(null, { currentLabelId, labels });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  setCurrentLabel: actions.labels.setCurrent,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(LabelSelect);
