import _ from 'lodash';
import getCursorPositionOnRay from '../libs/get_cursor_position_on_ray';
import THREE from 'three';


export default {

  threedViewer: {
    selectAnnotation({ LocalState }, annotationId) {
      const tool = LocalState.get('pet_3d_viewer.currentAnnotationTool');

      // only allow if no tool is present
      if (_.isEmpty(tool)) {
        LocalState.set('pet_3_d_viewer.selectedAnnotationId', annotationId);
      }
    },
    setCameraRay({ LocalState }, ray, clicked = false) {
      LocalState.set('pet_3_d_viewer.cameraRay', { ...ray, clicked });
    },
    showModelLoadingMessage({ LocalState }) {
      LocalState.set('pet_3d_viewer.modelIsLoaded', false);
    },
    hideModelLoadingMessage({ LocalState }) {
      LocalState.set('pet_3d_viewer.modelIsLoaded', true);
    },
    startSphereAnnotation({ LocalState }) {
      LocalState.set('pet_3d_viewer.currentAnnotationTool', { type: 'sphere' });
    },
    clearCurrentTool({ LocalState }) {
      LocalState.delete('pet_3d_viewer.currentAnnotationTool');
    },
    handleAnnotationKeyPress({ LocalState }, event) {
      const tool = LocalState.get('pet_3d_viewer.currentAnnotationTool');

      if (tool) {
        if (event.keyCode === 27) {        // esc
          LocalState.delete('pet_3d_viewer.currentAnnotationTool');
        } else if (event.keyCode === 8) {   // backspace / go back
            // TODO: check type
          if (_.get(tool, 'position')) {
            // has position, remove it
            LocalState.set('pet_3d_viewer.currentAnnotationTool', _.omit(tool, 'position'));
          } else if (_.get(tool, 'ray')) {
            // has ray, remove it
            LocalState.set('pet_3d_viewer.currentAnnotationTool', _.omit(tool, 'ray'));
          }
        }
      }
    },
    handleAnnotationToolClick({ FlowRouter, Collections: { Annotations }, LocalState }, ray) {
      const tool = LocalState.get('pet_3d_viewer.currentAnnotationTool');

      const labelId = LocalState.get('labels.currentLabelId');
      const caseId = FlowRouter.getParam('caseId');
      if (!caseId) {
        alert('Please select a case');
        return;
      }
      if (!tool || !tool.type) {
        return;
      }
      const cameraRay = LocalState.get('pet_3_d_viewer.cameraRay');
      const camera = LocalState.get('pet_3_d_viewer.camera');

      // add a guiding ray if it has none
      if (!_.get(tool, 'ray')) {
        LocalState.set('pet_3d_viewer.currentAnnotationTool', { ...tool, ray });
        // TODO : rotate camera
        // this does not work yet:
        /*
        const newRotation = {...camera.rotation, _y: camera.rotation._y + 90 * Math.PI / 180};
        console.log(newRotation);
        LocalState.set('pet_3_d_viewer.camera', {...camera, rotation: newRotation});
        */
      } else if (!_.get(tool, 'position')) {
        // already has a guide, but no position
        const position = getCursorPositionOnRay({ camera, cameraRay, markerRay: tool.ray });
        LocalState.set('pet_3d_viewer.currentAnnotationTool', { ...tool, position });
      } else {
        if (!labelId) {
          alert('Please select a label');
          return;
        }
        const radius = new THREE.Ray().copy(cameraRay).distanceToPoint(tool.position);
        Annotations.insert({
          caseId,
          labelId,
          type: 'sphere_3d',
          props: {
            ...tool, radius,
          },
        });
        LocalState.set('pet_3d_viewer.currentAnnotationTool', null);
      }
    },

    setCamera({ LocalState }, { position, quaternion, rotation }) {
      LocalState.set('pet_3_d_viewer.camera', { position, quaternion, rotation });
    },

    setAnnotationLabelId({ Collections: { Annotations } }, annotationId, labelId) {
      Annotations.update(annotationId, { $set: { labelId } });
    },
    deleteAnnotation({ Collections: { Annotations } }, annotationId) {
      Annotations.remove(annotationId);
    },
  },
};
