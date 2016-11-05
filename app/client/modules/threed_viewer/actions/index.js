export default {

  threedViewer: {
    addRay({LocalState}, ray) {

      const rays = LocalState.get('pet_3_d_viewer.rays') || [];
      rays.push(ray);
      LocalState.set('pet_3_d_viewer.rays', rays);
    },

    setRay({LocalState}, ray) {
      LocalState.set('pet_3_d_viewer.ray', ray);
    },

    setMarker({LocalState}, marker) {
      LocalState.set('pet_3_d_viewer.marker', marker);
    },

    setCamera({LocalState}, {position, quaternion, rotation}) {
      LocalState.set('pet_3_d_viewer.camera', {position, quaternion, rotation});
    },
    setMousePosition({LocalState}, pos) {
      LocalState.set('pet_3_d_viewer.mousePosition', pos);
    }
  }
};
