import React from 'react';
import {Renderer, Scene, Mesh, Line, Object3D} from 'react-three';
import _ from 'lodash';
import THREE from 'three';
import Measure from 'react-measure';
const OrbitControls = require('three-orbit-controls')(THREE);
import ControlledCamera from '../containers/controlled_camera';
import Axes from '../containers/axes';
import Rays from '../containers/rays';

const superProjectPointerEvent = Scene.prototype.projectPointerEvent;
Scene.prototype.projectPointerEvent = function (event, eventName, canvas) {
  superProjectPointerEvent.call(this, event, eventName, canvas);
  const { raycaster } = this._THREEMetaData;
  if (_.isFunction(this._currentElement.props.onClickRay)) {
    this._currentElement.props.onClickRay(event, raycaster.ray);
  }
};


const FOLDERS = {
  y: 'asset/slices_y_z_x',
  x: 'asset/slices_x_z_y'
};
const rotationAndPosition = ({index, axis}) => {
  // need to define for y as well?
  switch (axis) {
    case 'y': return {
      position: new THREE.Vector3(0, 50 - index / 4, 0),
      rotation: new THREE.Euler(90 * Math.PI / 180, 0, 0)
    };
    case 'x': return {
      position: new THREE.Vector3(0, 0, 50 - index / 2),
      rotation: new THREE.Euler(0, 0, 0)
    };
  }
};
const textureLoader = new THREE.TextureLoader();
const Slice = class extends React.Component {
  constructor() {
    super();
    this.state = {
      texture: null
    };
  }
  componentDidMount() {
    textureLoader.load(
      `${FOLDERS[this.props.axis]}/slice_${this.props.index}.jpg`,
      (texture) => {
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        this.setState({texture});
      }
    );
  }

  render() {
    const {index, axis, opacity} = this.props;
    const {position, rotation} = rotationAndPosition({index, axis});
    return (
    <Mesh
        position={position}
        rotation={rotation}
        material={new THREE.MeshBasicMaterial({
          map: this.state.texture,
          opacity,
          transparent: true,
          depthTest: false,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide
        })}
        geometry={new THREE.PlaneGeometry(200 / 2, 200 / 2)}
        />
      );
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

    const opacity = this.props.opacity;
    const {width, height} = this.state.dimensions;
    const slices = {
      y: _.range(0, 395),
      x: _.range(0, 200)
    };





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
            pointerEvents={[ 'onClick' ]}
            onClickRay={_.debounce((event, ray) => {
              // is called twice :-/
              this.props.addRay(ray);
            }, 100)}
            >
            <Axes />
            <Rays />
            <ControlledCamera

              name="maincamera"
              ref="camera"
              fov={75}
              target={new THREE.Vector3(0,0,0)}
              lookat={new THREE.Vector3(0,0,0)}
              aspect={width / height}
              near={0.1}
              far={1000}
            />
            {slices.x.map(
              index => (
                <Slice axis="x" opacity={opacity} index={index} key={index} />
              )
            )}
            {slices.y.map(
              index => (
                <Slice axis="y" opacity={opacity} index={index} key={index} />
              )
            )}
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
