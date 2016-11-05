import React from 'react';
import {Renderer, Scene, Mesh, Line, Object3D, PointCloud} from 'react-three';
import _ from 'lodash';
import THREE from 'three';
import Measure from 'react-measure';
const OrbitControls = require('three-orbit-controls')(THREE);
import ControlledCamera from '../containers/controlled_camera';
import Axes from '../containers/axes';
import Markers from '../containers/markers';

import PointCloudModel from '../containers/point_cloud_model';

// Scene is not a real class, so we do some other approach of inheritance:
const superProjectPointerEvent = Scene.prototype.projectPointerEvent;
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
Scene.prototype.projectPointerEvent = function (event, eventName, canvas) {
  if (this._THREEMetaData.orbitControlsIsChanging) {
    return;
  }
  superProjectPointerEvent.call(this, event, eventName, canvas);
  const { camera, raycaster, orbitControls } = this._THREEMetaData;
  if (eventName === 'onClick') {
    if (_.isFunction(this._currentElement.props.onClickRay)) {
      this._currentElement.props.onClickRay(event, raycaster.ray);
    }
  }
  if (eventName === 'onMouseMove') {
    if (_.isFunction(this._currentElement.props.onMouseMoveRay)) {
      const rect = canvas.getBoundingClientRect();
      const {clientX, clientY} = event.touches ? event.touches[0] : event;
      const x = ( (clientX - rect.left) / rect.width) * 2 - 1;
      const y = -( (clientY - rect.top) / rect.height) * 2 + 1;
      this._currentElement.props.onMouseMoveRay(event, {x,y}, raycaster.ray);
    }
  }
};




const Pet3DViewer = class extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      dimensions: {
        width: 100, height: 100
      }
    };
  }

  render() {

    const {width, height} = this.state.dimensions;

    return (
      <Measure
       onMeasure={(dimensions) => {
         this.setState({dimensions});
       }}
       >

       <div style={{height: '100%', width: '100%'}}>
        <Renderer
          width={width}
          height={height}
        >

          <Scene

            camera="maincamera"
            width={width}
            height={height}
            orbitControls={OrbitControls}
            pointerEvents={[ 'onClick', 'onMouseMove' ]}
            onOrbit={(camera) => {
              this.props.setCamera(camera);
            }}
            onMouseMoveRay={(event, mousePosition, ray) => {
              // this.props.setRayMarkerPosition();
              // console.log(ray.origin, ray.direction, 'mouseMove');
              // console.log(event.clientX, event.clientY);

              this.props.setRay(ray);
              this.props.setMousePosition(mousePosition);
            }}
            onClickRay={_.debounce((event, ray) => {
              // is called twice :-/
              // so debounce it.
              this.props.setMarker({ray});
            }, 100)}
            >
            <Axes />
            <Markers
              width={width}
              height={height}
            />
            <ControlledCamera

              name="maincamera"
              ref="camera"
              fov={75}
              target={new THREE.Vector3(0,0,0)}
              aspect={width / height}
              near={0.1}
              far={1000}
            />
            { this.props.currentCase ?
            <PointCloudModel
              key={this.props.currentCaseId}
              currentCase={this.props.currentCase}
            /> : null }



          </Scene>
        </Renderer>
        </div>
      </Measure>
    );
  }
};


Pet3DViewer.propTypes = {
};

Pet3DViewer.defaultProps = {
  rays: []
};

Pet3DViewer.displayName = 'Pet3DViewer';
export default Pet3DViewer;
