import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import Markers from '../components/markers.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, LocalState} = context();

  const marker = LocalState.get('pet_3_d_viewer.marker');

  const camera = LocalState.get('pet_3_d_viewer.camera');
  const ray = LocalState.get('pet_3_d_viewer.ray');
  const markers = marker ? [ marker ] : [];
  onData(null, {camera, ray, markers});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Markers);
