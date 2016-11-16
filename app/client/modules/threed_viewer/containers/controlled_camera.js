import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import {PerspectiveCamera} from 'react-three';
import THREE from 'three';

export const composer = ({context}, onData) => {
  const {LocalState, Meteor} = context();
  const {position, rotation} = LocalState.get('threed_viewer.camera');

  onData(null, {
    position,
    rotation: new THREE.Euler(rotation._x, rotation._y, rotation._z)});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(PerspectiveCamera);
