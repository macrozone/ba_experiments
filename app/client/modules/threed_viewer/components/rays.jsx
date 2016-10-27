import React from 'react';
import {Renderer, Scene, Mesh, Line, Object3D, ArrowHelper} from 'react-three';
import THREE from 'three';

export const Ray = ({direction, origin}) => {

  // taken from
  // https://github.com/mrdoob/three.js/blob/6c7f000734f8579da37fb39e5c2e9e5e2dfb14f8/src/extras/helpers/ArrowHelper.js#L62
  const axis = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.addAttribute( 'position', new THREE.Float32Attribute( [ 0, 0, 0, 0, 1, 0 ], 3 ) );
  const material = new THREE.LineBasicMaterial({color: 0xff0000});
  if ( direction.y > 0.99999 ) {
    quaternion.set( 0, 0, 0, 1 );
  } else if ( direction.y < -0.99999 ) {
    quaternion.set( 1, 0, 0, 0 );
  } else {
    axis.set( direction.z, 0, -direction.x ).normalize();
    const radians = Math.acos( direction.y );
    quaternion.setFromAxisAngle( axis, radians );
  }
  const rotation = new THREE.Euler();
  // can't make it to work wiht quaternion directly like in the arrow helper :-/
  // but setting rotation works!
  rotation.setFromQuaternion( quaternion, undefined, false );
  return (
    <Line
      position={origin}
      geometry={lineGeometry}
      rotation={rotation}
      scale={new THREE.Vector3(1000,1000,1000)}
      matrixAutoUpdate={false}
      material={material}
    />
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
