import actions from './actions';
import routes from './routes.jsx';
import THREE from 'three';

export default {
  routes,
  actions,
  load({LocalState}) {
    LocalState.set('pet_3_d_viewer.opacity', 0.05);
    LocalState.set('pet_3_d_viewer.cameraPosition', [ 0,0,100 ]);
    LocalState.set('pet_3_d_viewer.camera', {
      position: {x: 0, y: 0,z: 100},
      rotation: {x: 0, y: 0,z: 0},
      quaternion: new THREE.Quaternion()
    });
    LocalState.set('pet_3_d_viewer.ray',new THREE.Ray());
    LocalState.set('pet_3_d_viewer.cameraUp',[ 0,1,0 ]);
    LocalState.set('pet_3_d_viewer.showAxes',true);
  }
};
