import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';
import CaseSelect from '../components/case_select.jsx';

export const composer = ({ context, type }, onData) => {
  const { Meteor, Collections } = context();
  if (Meteor.subscribe('cases.byType', type).ready()) {
    const cases = Collections.Cases.find({ type }, { sort: { title: 1 } }).fetch();
    onData(null, { cases });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  selectCase: actions.cases.select,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(CaseSelect);
