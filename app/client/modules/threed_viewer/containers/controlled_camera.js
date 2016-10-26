import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import {PerspectiveCamera} from 'react-three';
import THREE from 'three';

export const composer = ({context}, onData) => {
  const {LocalState, Meteor} = context();
  const [ posX, posY, posZ ] = LocalState.get('pet_3_d_viewer.cameraPosition');
  const [ upX, upY, upZ ] = LocalState.get('pet_3_d_viewer.cameraUp');
  const position = new THREE.Vector3(posX, posY, posZ);
  const up = new THREE.Vector3(
    upX, upY, upZ
  );

  onData(null, {position, up});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(PerspectiveCamera);
