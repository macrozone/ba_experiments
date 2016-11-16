import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import Pet3DViewer from '../components/pet_3_d_viewer.jsx';

export const composer = ({context, caseId}, onData) => {
  const {Meteor, LocalState, Collections} = context();
  const opacity = LocalState.get('threed_viewer.opacity');

  const minSuv = LocalState.get('threed_viewer.min_suv');
  const maxSuv = LocalState.get('threed_viewer.max_suv');

  // case is a reserved word...
  const currentCase = Collections.Cases.findOne(caseId);

  onData(null,
    {caseId, currentCase, opacity, minSuv, maxSuv});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  addRay: actions.threedViewer.addRay,
  setCameraRay: actions.threedViewer.setCameraRay,
  handleMarkerTool: actions.threedViewer.handleMarkerTool,
  setCamera: actions.threedViewer.setCamera,

});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Pet3DViewer);
