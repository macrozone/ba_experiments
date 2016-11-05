import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import Pet3DViewer from '../components/pet_3_d_viewer.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, LocalState} = context();
  const opacity = LocalState.get('pet_3_d_viewer.opacity');

  const minSuv = LocalState.get('pet_3_d_viewer.min_suv');
  const maxSuv = LocalState.get('pet_3_d_viewer.max_suv');

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
  const setMousePosition = (pos) => LocalState.set('pet_3_d_viewer.mousePosition', pos);
  onData(null, {setMousePosition, opacity, minSuv, maxSuv, addRay, setMarker, setRay, setCamera});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Pet3DViewer);
