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
    const url = '/buffer/5940_i2_275_128_128.buf';
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


    const width = 128;
    const height = 128;
    const depth = 275;
    const numberOfClusters = 256;
    const maxSuv = 0.01;
    const minSuv = 0.0001;

    const clusters = [ ...Array(numberOfClusters) ].map((__, index) => ({
      geometry: new THREE.Geometry(),
      material: new THREE.PointsMaterial({
        opacity: this.props.opacity,
        transparent: true,
        size: 0.1,
        color: new THREE.Color(`hsl(${Math.round(index / numberOfClusters * 256)}, 100%, 50%)`)
      })
    }));


    // get value between 0 and 1 in the suv-window
    const getNormalized = suv => (suv - minSuv) / (maxSuv - minSuv);

    // get cluster index (can be outside of range)
    const getClusterIndex = suv => Math.floor(getNormalized(suv) * numberOfClusters);

    let highestSuv = 0;
    if (this.state.data) {
      for (let i = 0; i < this.state.data.byteLength; i++) {
        const value = this.state.data[i]; // some are undefined, TODO: find out why
        highestSuv = Math.max(maxSuv, value);
        const clusterIndex = getClusterIndex(value);


        if (clusters[clusterIndex]) {

          const x = i % width;
          const z = Math.floor(i / width) % height;
          const y = Math.floor(i / (width * height));
          const vertex = new THREE.Vector3();
                  // console.log(x,y,z);
          vertex.x = x;
          vertex.y = y;
          vertex.z = z;
          clusters[clusterIndex].geometry.vertices.push(vertex);
        }

      }
    }
    console.log({highestSuv});
    return <Object3D
      position={new THREE.Vector3(-width / 2, -depth / 2, -height / 2)}
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
