import React from 'react';
import {Renderer, Scene, Mesh, Line, Object3D} from 'react-three';
import THREE from 'three';

export const Axis = ({from, to, color}) => {
  const material = new THREE.LineBasicMaterial({color, transparent: true, depthTest: false});
  const geometry = new THREE.Geometry();
  geometry.vertices.push(
    new THREE.Vector3( ...from),
    new THREE.Vector3( ...to )
  );
  return <Line geometry={geometry} material={material}/>;
};


const Axes = ({showAxes}) => {
  return (
    <Object3D visible={showAxes}>
      <Axis color={0xff0000} from={[ -1000, 0, 0 ]} to={[ 1000, 0, 0 ]} />
      <Axis color={0x00ff00} from={[ 0, -1000, 0 ]} to={[ 0, 1000, 0 ]} />
      <Axis color={0x0000ff} from={[ 0, 0, -1000 ]} to={[ 0, 0, 1000 ]} />
    </Object3D>
  );
};

Axes.displayName = 'Axes';
export default Axes;
