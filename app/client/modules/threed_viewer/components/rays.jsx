import React from 'react';
import {Renderer, Scene, Mesh, Line, Object3D, ArrowHelper} from 'react-three';
import THREE from 'three';

export const Ray = ({direction, origin}) => {
  return (
    <ArrowHelper
      direction={new THREE.Vector3(direction.x, direction.y, direction.z).normalize()}
      origin={new THREE.Vector3(origin.x, origin.y, origin.z)}
      length={100}
      headWidth={5}
      headLength={10}
      color={0xff0000} />
  );
};


const Rays = ({rays}) => {

  return (
    <Object3D>
    {
      rays.map((ray, index) => (
        <Ray {...ray} key={index} />
      ))
    }
    </Object3D>
  );
};

Rays.displayName = 'Rays';
Rays.defaultProps = {
  rays: []
};
export default Rays;
