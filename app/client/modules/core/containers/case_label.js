import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';
import CaseLabel from '../components/case_label.jsx';

export const composer = ({ context, caseId }, onData) => {
  const { Meteor, Collections } = context();
  if (Meteor.subscribe('cases.all').ready()) {
    const theCase = Collections.Cases.findOne(caseId);
    onData(null, theCase);
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(CaseLabel);
