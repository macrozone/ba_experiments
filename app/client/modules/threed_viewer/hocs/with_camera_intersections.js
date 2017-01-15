import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';

import THREE from 'three';
import { withState, withHandlers } from 'recompose';

export const rayCasterComposer = ({ context, setIntersected }, onData) => {
  const { LocalState } = context();
  const { origin, direction, clicked } = LocalState.get('pet_3_d_viewer.cameraRay');
  const raycaster = new THREE.Raycaster(
    new THREE.Vector3(origin.x, origin.y, origin.z),
    new THREE.Vector3(direction.x, direction.y, direction.z)
  );
  onData(null, { raycaster, clicked });
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default ThreeC => composeAll(
  withHandlers({
    checkIntersection: ({ raycaster, intersected, setIntersected, clicked, clickSent, setClickSent, onClick }) => (mesh) => {
      if (mesh) {
        const intersections = [];
        mesh.raycast(raycaster, intersections);
        if (intersections.length > 0) {
          if (clicked && clicked !== clickSent && onClick) {
            onClick();
            setClickSent(clicked); // timestamp
          }
          if (!intersected) {
            setIntersected(true);
          }
        } else if (intersected) {
          setIntersected(false);
        }
      }
    },
  }),
  withState('clickSent', 'setClickSent', false),
  withState('intersected', 'setIntersected', false),
  composeWithTracker(rayCasterComposer),
  useDeps(depsMapper)
)(ThreeC);
