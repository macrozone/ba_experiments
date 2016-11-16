import actions from './actions';
import routes from './routes.jsx';
import THREE from 'three';

export default {
  routes,
  actions,
  load({LocalState}) {
    LocalState.set('threed_viewer.opacity', 1);

    LocalState.set('threed_viewer.min_suv', 0.0001);
    LocalState.set('threed_viewer.max_suv', 0.0025);
    LocalState.set('threed_viewer.point_size', 1);

    LocalState.set('threed_viewer.camera', {
      position: {x: 0, y: 0,z: 450},
      rotation: {x: 0, y: 0,z: 0},
      quaternion: new THREE.Quaternion()
    });
    LocalState.set('threed_viewer.cameraRay',new THREE.Ray());
    LocalState.set('threed_viewer.showAxes',true);
    LocalState.set('threed_viewer.blending','NormalBlending');
    LocalState.set('threed_viewer.markerTool',{});
  }
};
