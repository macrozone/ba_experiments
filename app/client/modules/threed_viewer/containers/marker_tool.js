import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import MarkerTool from '../components/marker_tool.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, LocalState} = context();
  const camera = LocalState.get('threed_viewer.camera');
  const cameraRay = LocalState.get('threed_viewer.cameraRay');
  const markerTool = LocalState.get('threed_viewer.markerTool');
  onData(null, {camera, cameraRay, markerTool});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(MarkerTool);
