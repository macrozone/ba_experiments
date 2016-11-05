import React from 'react';
import {Renderer, Scene, Mesh, Line, Object3D, PointCloud} from 'react-three';
import _ from 'lodash';
import THREE from 'three';




const PointCloudModel = class extends React.Component {
  constructor() {
    super();

    this.state = {
      data: null
    };
  }
  componentDidMount() {
    var oReq = new XMLHttpRequest();
    const url = '/buffer/24636786_i5_396_200_200.buf';
    oReq.open('GET', url, true);
    oReq.responseType = 'arraybuffer';

    oReq.onload = () => {
      const arrayBuffer = oReq.response; // Note: not oReq.responseText
      if (arrayBuffer) {
        var byteArray = new Float32Array(arrayBuffer);
        this.setState({data: byteArray});
      }
    };
    oReq.send(null);

  }

  render() {

    const width = 200;
    const height = 200;
    const depth = 396;

    const numberOfClusters = 256;
    const {maxSuv, minSuv, opacity, pointSize} = this.props;

    const suvRange = maxSuv - minSuv;

    const clusters = [ ...Array(numberOfClusters) ].map((__, index) => ({
      geometry: new THREE.Geometry(),
      material: new THREE.PointsMaterial({
        opacity,
        transparent: true,
        size: pointSize,
        color: new THREE.Color(`hsl(${Math.round(index / numberOfClusters * 256)}, 100%, 50%)`)
      })
    }));


    // get value between 0 and 1 in the suv-window
    const getNormalized = suv => (suv - minSuv) / suvRange;

    // get cluster index (can be outside of range)
    const getClusterIndex = suv => Math.floor(getNormalized(suv) * numberOfClusters);


    if (this.state.data) {
      for (let i = 0; i < this.state.data.byteLength; i++) {
        const value = this.state.data[i] || 0.0; // some are undefined, TODO: find out why
        if (value >= minSuv && value < maxSuv) {
          const clusterIndex = getClusterIndex(value);
          const x = i % width;
          const z = Math.floor(i / width) % height;
          const y = -Math.floor(i / (width * height)); // is swapped
          clusters[clusterIndex].geometry.vertices.push({x,y,z});
        }
      }
    }

    return <Object3D
      position={new THREE.Vector3(-width / 2, depth / 2, -height / 2)}
    >
    {
      clusters.map(({material, geometry}, index) => (
        <PointCloud
          key={index}
          material={material}
          geometry={geometry}
        />
      ))
    }
    </Object3D>;


  }
};



PointCloudModel.propTypes = {
};

PointCloudModel.defaultProps = {
  rays: []
};

PointCloudModel.displayName = 'PointCloudModel';
export default PointCloudModel;
