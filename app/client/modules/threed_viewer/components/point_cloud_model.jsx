import React from 'react';
import { Renderer, Scene, Mesh, Line, Object3D, PointCloud } from 'react-three';
import _ from 'lodash';
import THREE from 'three';
import petPalette from '/lib/palettes/pet';

const Y_SCALE = 0.5; // data is scaled in this direction // TODO: find correct value

const PointCloudModel = class extends React.Component {
  constructor() {
    super();

    this.state = {
      data: null,
    };
  }
  componentDidMount() {
    const oReq = new XMLHttpRequest();
    const url = `/data${this.props.currentCase.data}`;
    oReq.open('GET', url, true);
    oReq.responseType = 'arraybuffer';
    _.invoke(this.props, 'onLoadStart');
    oReq.onload = () => {
      const arrayBuffer = oReq.response; // Note: not oReq.responseText
      if (arrayBuffer) {
        const byteArray = new Float32Array(arrayBuffer);
        this.setState({ data: byteArray });
        _.invoke(this.props, 'onLoadFinish');
      }
    };
    oReq.send(null);
  }

  render() {
    const { width, height, depth } = this.props.currentCase;
    const numberOfClusters = petPalette.length;
    const { maxSuv, minSuv, opacity, pointSize, blending } = this.props;
    const suvRange = maxSuv - minSuv;

    const clusters = petPalette.map(color => ({
      geometry: new THREE.Geometry(),
      material: new THREE.PointsMaterial({
        opacity,
        blending: THREE[blending],
        transparent: true,
        size: pointSize,
        alphaTest: 0.1,
        // depthTest=false is important, otherwise, you don't see "in" the model
        // because particles on the surface hide particles in the interior of the body
        depthTest: false,
        // threejs color wants from 0-1 instead of 0-255
        color: new THREE.Color(...color.map(c => c / 255)),
      }),
    }));


    // get value between 0 and 1 in the suv-window
    const getNormalized = suv => (suv - minSuv) / suvRange;

    // get cluster index
    const getClusterIndex = suv => _.clamp(
      Math.floor(getNormalized(suv) * numberOfClusters),
      0,
      numberOfClusters - 1
    );


    if (this.state.data) {
      for (let i = 0; i < this.state.data.byteLength; i++) {
        const valueRaw = this.state.data[i] || 0.0; // some are undefined, TODO: find out why
        const value = valueRaw;
        // we ommit pixels below min treshhold (Because they are rendered black)
        // but show pixels over the max treshhold

        if (value >= minSuv) {
          const clusterIndex = getClusterIndex(value);
          const x = i % width;
          const z = Math.floor(i / width) % height;
          const y = -Math.floor(i / (width * height)) * Y_SCALE; // is swapped
          clusters[clusterIndex].geometry.vertices.push({ x, y, z });
        }
      }
    }

    return (
      <Object3D
        position={new THREE.Vector3(-width / 2, depth * Y_SCALE / 2, -height / 2)}
      >
        { clusters.map(({ material, geometry }, index) => (
          <PointCloud
            key={index}
            material={material}
            geometry={geometry}
          />
      ))
      }
      </Object3D>
    );
  }
};


PointCloudModel.propTypes = {
};

PointCloudModel.defaultProps = {
  rays: [],
};

PointCloudModel.displayName = 'PointCloudModel';
export default PointCloudModel;
