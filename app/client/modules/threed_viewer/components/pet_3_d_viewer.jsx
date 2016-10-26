import React from 'react';
import {Renderer, Scene, PerspectiveCamera, Mesh} from 'react-three';
import _ from 'lodash';
import THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE);

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
const Slice = ({index, axis, opacity}) => {
  // y
  const texture = THREE.ImageUtils.loadTexture(`${FOLDERS[axis]}/slice_${index}.jpg` );
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  const {position, rotation} = rotationAndPosition({index, axis});
  return (
    <Mesh
        position={position}
        rotation={rotation}
        material={new THREE.MeshBasicMaterial({
          map: texture,
          opacity,
          transparent: true,
          depthTest: false,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide
        })}
        geometry={new THREE.PlaneGeometry(200 / 2, 200 / 2)}
        />
      );
};


const Pet3DViewer = class extends React.Component {
  componentDidMount() {
    const controls = new OrbitControls(this.refs.camera);
    this.controls = controls;
  }

  componentWillUnmount() {
    this.controls.dispose();
    delete this.controls;
  }

  constructor(props, context) {
    super(props, context);
    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(0, 0, 100);
  }

  render() {
    const opacity = this.props.opacity;
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height
    const slices = {
      y: _.range(0, 395),
      x: _.range(0, 200)
    };
    return (
      <Renderer
        width={width}
        height={height}
      >
        <Scene camera="maincamera" width={width} height={height}>
          <PerspectiveCamera
            name="maincamera"
            ref="camera"
            fov={75}
            aspect={width / height}
            near={0.1}
            far={1000}
            position={this.cameraPosition}
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
    );
  }
};


Pet3DViewer.propTypes = {
};

Pet3DViewer.defaultProps = {
};

Pet3DViewer.displayName = 'Pet3DViewer';
export default Pet3DViewer;
