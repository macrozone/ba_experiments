import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';
import Pet3DViewerPanel from '../components/pet_3_d_viewer_panel.jsx';

export const composer = ({ context, caseId }, onData) => {
  const { LocalState, Meteor, Collections } = context();
  if (Meteor.subscribe('cases.one', caseId)) {
    const theCase = Collections.Cases.findOne(caseId);
    if (theCase) {
      // setting minimum to total minimum will impact performance
      const range = theCase.data.max - theCase.data.min;
      const min = theCase.data.min + (range * 0.001);
      LocalState.set('pet_3_d_viewer.min_suv', min);
      LocalState.set('pet_3_d_viewer.max_suv', theCase.data.max);
    }
    onData(null, { theCase });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Pet3DViewerPanel);
