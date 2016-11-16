import React from 'react';
import {Renderer} from 'react-three';
import Scene from './scene_extended';
import _ from 'lodash';
import THREE from 'three';
import Measure from 'react-measure';
const OrbitControls = require('three-orbit-controls')(THREE);
import ControlledCamera from '../containers/controlled_camera';
import Axes from '../containers/axes';
import MarkerTool from '../containers/marker_tool';
import PointCloudModel from '../containers/point_cloud_model';

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
            onMouseMoveRay={(event, ray) => {
              this.props.setCameraRay(ray);
            }}
            // is called twice :-/
            // so debounce it.
            onClickRay={_.debounce((event, ray) => {
              this.props.handleMarkerTool(ray);
            }, 100, {leading: true, trailing: false})}
            >
            <Axes />
            <MarkerTool
            />
            <ControlledCamera

              name="maincamera"
              ref="camera"
              fov={75}
              target={new THREE.Vector3(0,0,0)}
              lookAt={new THREE.Vector3(0,0,0)}
              aspect={width / height}
              near={0.1}
              far={1000}
            />
            { this.props.currentCase ?
            <PointCloudModel
              key={this.props.caseId}
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
