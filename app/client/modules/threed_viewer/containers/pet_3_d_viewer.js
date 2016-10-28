import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import Pet3DViewer from '../components/pet_3_d_viewer.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, LocalState} = context();
  const opacity = LocalState.get('pet_3_d_viewer.opacity');

  const addRay = (ray) => {

    const rays = LocalState.get('pet_3_d_viewer.rays') || [];
    rays.push(ray);
    LocalState.set('pet_3_d_viewer.rays', rays);
  };

  const setRay = (ray) => {
    LocalState.set('pet_3_d_viewer.ray', ray);
  };

  const setMarker = (marker) => {
    LocalState.set('pet_3_d_viewer.marker', marker);
  };

  const setCamera = ({position, quaternion, rotation}) => {
    LocalState.set('pet_3_d_viewer.camera', {position, quaternion, rotation});
  };
  const setMousePosition = (x,y) => LocalState.set('pet_3_d_viewer.mousePosition', {x,y});
  onData(null, {setMousePosition, opacity, addRay, setMarker, setRay, setCamera});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Pet3DViewer);
