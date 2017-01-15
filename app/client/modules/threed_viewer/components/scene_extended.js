import { Scene } from 'react-three';
import THREE from 'three';
import _ from 'lodash';
/**

  we extend the react-three-scene with support for more properties:

  - onOrbit: will be called when orbitcontrols are changed. It will pass the current camera
  - onClickRay: will be called on a click on the scene with arguments:
    event, the current ray from the camera to the mousePosition and the mousePosition
  - onMouseMoveRay: same as above, but on every mousemove
**/
// Scene is not a real class, so we do some other approach of inheritance:
const superBindOrbitControls = Scene.prototype.bindOrbitControls;
Scene.prototype.bindOrbitControls = function (inst, canvas, props) {
  superBindOrbitControls.call(this, inst, canvas, props);
  if (this._THREEMetaData.orbitControls) {
    this._THREEMetaData.orbitControls.addEventListener('change', () => {
      this._THREEMetaData.orbitControlsIsChanging = true;
      if (_.isFunction(this._currentElement.props.onOrbit)) {
        this._currentElement.props.onOrbit(this._THREEMetaData.camera);
      }
    });
    this._THREEMetaData.orbitControls.addEventListener('end', _.debounce(() => {
      // wait a bit
      this._THREEMetaData.orbitControlsIsChanging = false;
    }), 300);
  }
};

// we override the original function completly, because it tries to raycast to every child
// which leads to bad performance
Scene.prototype.projectPointerEvent = function (event, eventName, canvas) {
  if (this._THREEMetaData.orbitControlsIsChanging) {
    return; // prevent pointer events if orbit is rotating
  }
  event.preventDefault();
  const rect = canvas.getBoundingClientRect();

  const { clientX, clientY } = event.touches ? event.touches[0] : event;
  const x = ((clientX - rect.left) / rect.width) * 2 - 1;
  const y = -((clientY - rect.top) / rect.height) * 2 + 1;

  const mousecoords = new THREE.Vector3(x, y, 0.5);
  let { raycaster, camera } = this._THREEMetaData;

  raycaster.setFromCamera(mousecoords, camera);
  if (eventName === 'onClick') {
    if (_.isFunction(this._currentElement.props.onClickRay)) {
      this._currentElement.props.onClickRay(event, raycaster, { x, y });
    }
  }
  if (eventName === 'onMouseMove') {
    if (_.isFunction(this._currentElement.props.onMouseMoveRay)) {
      this._currentElement.props.onMouseMoveRay(event, raycaster, { x, y });
    }
  }
};

export default Scene;
