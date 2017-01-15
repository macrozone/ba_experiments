import React from 'react';
import { Renderer } from 'react-three';
import Scene from './scene_extended';
import _ from 'lodash';
import THREE from 'three';
import Measure from 'react-measure';

const OrbitControls = require('three-orbit-controls')(THREE);

import ControlledCamera from '../containers/controlled_camera';
import Axes from '../containers/axes';
import PointCloudModel from '../containers/point_cloud_model';
import { Alert } from 'react-bootstrap';
import AnnotationTools3D from '../containers/annotation_tools_3_d';
import Annotations3D from '../containers/annotations_3_d';

const Pet3DViewer = class extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      dimensions: {
        width: 100, height: 100,
      },
    };
  }
  render() {
    const { width, height } = this.state.dimensions;

    if (!this.props.caseId) {
      return (
        <Alert bsStyle="primary">
          Please select a Case
        </Alert>
      );
    }
    if (!this.props.currentCase) {
      return (
        <Alert bsStyle="primary">
          Loading ....
        </Alert>
      );
    }
    const camera = (
      <ControlledCamera
        name="maincamera"
        ref="camera"
        fov={75}
        target={new THREE.Vector3(0, 0, 0)}
        lookAt={new THREE.Vector3(0, 0, 0)}
        aspect={width / height}
        near={0.1}
        far={1000}
      />
    );
    return (
      <Measure
        onMeasure={(dimensions) => {
          this.setState({ dimensions });
        }}
      >
        <div style={{ height: '100%', width: '100%' }}>
          {!this.props.modelIsLoaded && (
            <div style={{ fontWeight: 'bold', color: 'white', position: 'absolute', top: 10, left: 10 }}>
              Loading...
            </div>
          )}
          <Renderer
            width={width}
            height={height}
            rendererProps={{
              preserveDrawingBuffer: true, // needed for canvas.toDataURL (in tests)
            }}
          >
            <Scene
              camera="maincamera"
              width={width}
              height={height}
            >
              {camera}

              <PointCloudModel
                key={this.props.caseId}
                currentCase={this.props.currentCase}
                onLoadStart={this.props.showModelLoadingMessage}
                onLoadFinish={this.props.hideModelLoadingMessage}
              />

            </Scene>
            <Scene
            // a second scene for tools, because otherwise there are
            // z-index problems with the mesh
              camera="maincamera"
              width={width}
              height={height}
              orbitControls={OrbitControls}
              pointerEvents={['onClick', 'onMouseMove']}
              onOrbit={(theCamera) => {
                this.props.setCamera(theCamera);
              }}
              onMouseMoveRay={(event, raycaster) => {
                this.props.setCameraRay(raycaster.ray);
              }}
            // is called twice :-/
            // so debounce it.
              onClickRay={_.debounce((event, { ray }) => {
                this.props.setCameraRay(ray, new Date().getTime());
                this.props.handleAnnotationToolClick(ray);
              }, 100, { leading: true, trailing: false })}
            >
              {camera}
              <AnnotationTools3D caseId={this.props.caseId} />
              <Annotations3D caseId={this.props.caseId} />
              <Axes />
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
  rays: [],
};

Pet3DViewer.displayName = 'Pet3DViewer';
export default Pet3DViewer;
