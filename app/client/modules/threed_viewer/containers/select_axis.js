import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import SelectAxis from '../components/select_axis.jsx';
import THREE from 'three';

export const composer = ({context}, onData) => {
  const {Meteor, LocalState} = context();
  const cameraPosition = LocalState.get('pet_3_d_viewer.cameraPosition');
  const cameraUp = LocalState.get('pet_3_d_viewer.cameraUp');
  onData(null, {cameraPosition, cameraUp});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  setFrontal: () => {
    context.LocalState.set(
      'pet_3_d_viewer.cameraPosition', [ 0,0,100 ]
    );
    context.LocalState.set(
      'pet_3_d_viewer.cameraUp', [ 0,1,0 ]
    );
  },
  setSagittal: () => {
    context.LocalState.set(
      'pet_3_d_viewer.cameraPosition', [ 100,0,0 ]
    );
    context.LocalState.set(
      'pet_3_d_viewer.cameraUp', [ 0,1,0 ]
    );
  },
  setTransversal: () => {
    context.LocalState.set(
      'pet_3_d_viewer.cameraPosition', [ 0,100,0 ]
    );
    context.LocalState.set(
      'pet_3_d_viewer.cameraUp', [ 0,0,1 ]
    );
  },
  setCameraUpX: (value) => {
    const [ x,y,z ] = context.LocalState.get('pet_3_d_viewer.cameraUp');
    context.LocalState.set(
      'pet_3_d_viewer.cameraUp',
      [ value, y, z ]
    );
  },
  setCameraUpY: (value) => {
    const [ x,y,z ] = context.LocalState.get('pet_3_d_viewer.cameraUp');
    context.LocalState.set(
      'pet_3_d_viewer.cameraUp',
      [ x, value, z ]
    );
  },
  setCameraUpZ: (value) => {
    const [ x,y,z ] = context.LocalState.get('pet_3_d_viewer.cameraUp');
    context.LocalState.set(
      'pet_3_d_viewer.cameraUp',
      [ x, y, value ]
    );
  }
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SelectAxis);
