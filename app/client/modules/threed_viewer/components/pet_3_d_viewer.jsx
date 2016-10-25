import React from 'react';
import withTheme from '/manul-utils/with_theme';
import {Renderer, Scene, PerspectiveCamera, MeshBasicMaterial, Mesh} from 'react-three';
import _ from 'lodash';
import THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE);


const Slice = ({index}) => {
  const texture = THREE.ImageUtils.loadTexture( `slices_y_z_x/slice_${index}.jpg` );
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  return <Mesh
        position={new THREE.Vector3(0, 50 - index / 4, 0)}
        rotation={new THREE.Euler(90 * Math.PI / 180, 0, 0)}
        material={new THREE.MeshBasicMaterial({
          map: texture,
          opacity: 0.05,
          transparent: true,
          depthTest: false,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide

        })}
        geometry={new THREE.PlaneGeometry(200 / 2, 200 / 2)}
        />;
};
const Slice2 = ({index}) => {
  const texture = THREE.ImageUtils.loadTexture( `slices_x_z_y/slice_${index}.jpg` );
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  return <Mesh
        position={new THREE.Vector3(0,0,50 - index / 2)}
        rotation={new THREE.Euler(0, 0, 0)}
        material={new THREE.MeshBasicMaterial({
          map: texture,
          opacity: 0.05,
          transparent: true,
          depthTest: false,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide

        })}
        geometry={new THREE.PlaneGeometry(200 / 2, 200 / 2)}
        />;
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

    this.state = {
      cubeRotation: new THREE.Euler(),
    };

  }

  render() {

    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height
    const numberOfSlices = 395;

    return (<Renderer

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
        {_.range(0, numberOfSlices).map(
          index => (
            <Slice index={index} key={index} />
          )
        )}
        {_.range(0, 200).map(
          index => (
            <Slice2 index={index} key={index} />
          )
        )}

      </Scene>
    </Renderer>);
  }
};


Pet3DViewer.propTypes = {
};

Pet3DViewer.defaultProps = {
};

Pet3DViewer.displayName = 'Pet3DViewer';
export default Pet3DViewer;
