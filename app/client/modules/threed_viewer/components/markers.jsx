import React from 'react';
import {Renderer, Scene, Mesh, Line, Object3D, ArrowHelper} from 'react-three';
import THREE from 'three';

const Point = ({position}) => {

  const geometry = new THREE.SphereBufferGeometry( 2, 16, 16 );
  const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );

  return (
    <Mesh
      position={position}
      geometry={geometry}
      material={material}
    />
  );
};

const directionToRotation = (direction) => {
  // taken from
  // https://github.com/mrdoob/three.js/blob/6c7f000734f8579da37fb39e5c2e9e5e2dfb14f8/src/extras/helpers/ArrowHelper.js#L62
  const axis = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
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
  return rotation;
};

const DIRECTIONAL_LINE_GEOMETRY = new THREE.BufferGeometry();
DIRECTIONAL_LINE_GEOMETRY.addAttribute( 'position', new THREE.Float32Attribute( [ 0, 0, 0, 0, 1, 0 ], 3 ) );

export const Ray = ({direction, origin}) => {
  const rotation = directionToRotation(direction);



  const material = new THREE.LineBasicMaterial({color: 0xff0000});

  return (
    <Line
    geometry={DIRECTIONAL_LINE_GEOMETRY}
    scale={new THREE.Vector3(1000,1000,1000)}
    material={material}
    position={origin}
    rotation={rotation}
    />
  );
};

const Marker = ({camera, marker, mousePosition, ray}) => {

  // const n = new THREE.Vector3();
  // const up = new THREE.Vector3(0,1,0);
  const right = new THREE.Vector3(1,0,0);
  // n.crossVectors(ray.direction, up);
  const d = new THREE.Ray().copy(ray).distanceToPoint(new THREE.Vector3(0,0,0));
  const n = right.applyQuaternion(new THREE.Quaternion(
    camera.quaternion._x, camera.quaternion._y, camera.quaternion._z, camera.quaternion._w
  ));
  const plane = new THREE.Plane(n, d);
  const intersection = new THREE.Ray().copy(marker.ray).intersectPlane(plane);

  return <Object3D>
    <Ray {...marker.ray} />

    {intersection && <Point position={intersection}/> }
    </Object3D>;
};


const Plane = ({direction, origin}) => {
  const planeGeometry = new THREE.PlaneGeometry(1000, 1000 );
  const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
  const rotation = directionToRotation(direction);
  return (
    <Object3D>
      <Ray direction={direction} origin={{...origin, y: origin.y - 1}}/>
      <Mesh
        geometry={planeGeometry}
        material={material}
        position={origin}
        rotation={rotation}
      />
    </Object3D>
  );
};
const Markers = ({mousePosition, ray, camera, markers}) => {


  return (
    <Object3D>

    {
      markers.map((marker, index) => (
        <Marker
        mousePosition={mousePosition}
        marker={marker}
        camera={camera}
        ray={ray}
        key={index}
        />
      ))
    }
    </Object3D>
  );
};

Markers.displayName = 'Markers';
Markers.defaultProps = {

};
export default Markers;
