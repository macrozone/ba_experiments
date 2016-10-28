import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import SelectAxis from '../components/select_axis.jsx';
import THREE from 'three';
import _ from 'lodash';

export const composer = ({context}, onData) => {
  const {Meteor, LocalState} = context();
  // const cameraPosition = LocalState.get('pet_3_d_viewer.cameraPosition');
  // const cameraUp = LocalState.get('pet_3_d_viewer.cameraUp');
  const camera = LocalState.get('pet_3_d_viewer.camera');
  onData(null, {camera});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  setCameraProp: (prop, value) => {
    const camera = context.LocalState.get( 'pet_3_d_viewer.camera');
    _.set(camera, prop, parseFloat(value));
    context.LocalState.set( 'pet_3_d_viewer.camera', camera);
  },
  setFrontal: () => {
    context.LocalState.set(
      'pet_3_d_viewer.camera', {
        position: {x: 0, y: 0, z: 100},
        rotation: {_x: 0, _y: 0, _z: 0}
      }
    );
  },
  setSagittal: () => {
    context.LocalState.set(
      'pet_3_d_viewer.camera', {
        position: {x: -100, y: 0, z: 0},
        rotation: {_x: 0, _y: -Math.PI / 2, _z: 0}
      }
    );
  },
  setTransversal: () => {
    context.LocalState.set(
      'pet_3_d_viewer.camera', {
        position: {x: 0, y: 100, z: 0},
        rotation: {_x: -Math.PI / 2, _y: 0, _z: 0}
      }
    );
  },

});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SelectAxis);
