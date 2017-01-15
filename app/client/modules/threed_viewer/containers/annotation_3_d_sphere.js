import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';

import Annotation3DSphere from '../components/annotation_3_d_sphere.jsx';
import withCameraIntersections from '../hocs/with_camera_intersections';


export const composer = ({ context, isSelected }, onData) => {
  const { LocalState } = context();
  const blink = LocalState.get('pet_3_d_viewer.blink');
  onData(null, { blink: isSelected && blink });
};
export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  withCameraIntersections,
  useDeps(depsMapper)
)(Annotation3DSphere);
