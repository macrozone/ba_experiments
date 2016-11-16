import _ from 'lodash';
import getCursorPositionOnRay from '../libs/get_cursor_position_on_ray';


export default {

  threedViewer: {
    setPetOptions({LocalState}, petOptions) {
      LocalState.set('threed_viewer.petOptions', petOptions);
    },
    addRay({LocalState}, ray) {

      const rays = LocalState.get('threed_viewer.rays') || [];
      rays.push(ray);
      LocalState.set('threed_viewer.rays', rays);
    },

    setCameraRay({LocalState}, ray) {
      LocalState.set('threed_viewer.cameraRay', ray);
    },

    handleMarkerTool({LocalState}, ray) {
      const markerTool = LocalState.get('threed_viewer.markerTool');
      const cameraRay = LocalState.get('threed_viewer.cameraRay');
      const camera = LocalState.get('threed_viewer.camera');

      // add a guiding ray if it has none
      if (!_.get(markerTool, 'ray')) {
        LocalState.set('threed_viewer.markerTool', {ray});
        // TODO : rotate camera
        // this does not work yet:
        /*
        const newRotation = {...camera.rotation, _y: camera.rotation._y + 90 * Math.PI / 180};
        console.log(newRotation);
        LocalState.set('threed_viewer.camera', {...camera, rotation: newRotation});
        */
      } else if (!_.get(markerTool, 'position')) {
        // already has a guide, but no position
        const position = getCursorPositionOnRay({camera, cameraRay, markerRay: markerTool.ray});
        LocalState.set('threed_viewer.markerTool', {...markerTool, position});
      } else {
        // todo add marker
        alert('marker done');
        // clear
        LocalState.set('threed_viewer.markerTool', {});
      }
    },

    setCamera({LocalState}, {position, quaternion, rotation}) {
      LocalState.set('threed_viewer.camera', {position, quaternion, rotation});
    }

  }
};
