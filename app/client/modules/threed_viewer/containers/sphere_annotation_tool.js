import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';
import SphereAnnotationTool from '../components/sphere_annotation_tool.jsx';

export const composer = ({ context }, onData) => {
  const { Meteor, LocalState } = context();
  const camera = LocalState.get('pet_3_d_viewer.camera');
  const cameraRay = LocalState.get('pet_3_d_viewer.cameraRay');
  const sphereAnnotationTool = LocalState.get('pet_3d_viewer.currentAnnotationTool');
  onData(null, { camera, cameraRay, sphereAnnotationTool });
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SphereAnnotationTool);
