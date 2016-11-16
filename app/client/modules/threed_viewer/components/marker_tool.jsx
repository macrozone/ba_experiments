import React from 'react';
import {Renderer, Scene, Mesh, Line, Object3D, ArrowHelper} from 'react-three';
import THREE from 'three';
import getCursorPositionOnRay from '../libs/get_cursor_position_on_ray';

const PositionHandle = ({position}) => {

  const geometry = new THREE.SphereBufferGeometry( 4, 8, 8 );


  return (
    <Object3D position={position}>
      <Mesh
        geometry={new THREE.SphereBufferGeometry( 8, 32, 32 )}
        material={new THREE.MeshBasicMaterial({
          color: 0xffff00,
          opacity: 0.4,
          transparent: true,
          depthTest: false,
        })}
      />
      <Mesh
        geometry={new THREE.SphereBufferGeometry( 1, 32, 32 )}
        material={new THREE.MeshBasicMaterial({
          color: 0xff0000,
          opacity: 0.8,
          transparent: true,
          depthTest: false,
        })}
      />
    </Object3D>
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

  const material = new THREE.LineBasicMaterial({
    color: 0xff0000,
    transparent: true,
    depthTest: false,
    blending: THREE.AdditiveBlending
  });

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


const MarkerTool = ({cameraRay, camera, markerTool = {}}) => {
  const handlePosition = !markerTool.ray ?
    // show handle at a certain distance in direction of the camera ray
    new THREE.Ray().copy(cameraRay).at(200) :
    getCursorPositionOnRay({
      camera, cameraRay, markerRay: markerTool.ray
    });
  const showRadiusHandle = !markerTool.position;

  return <Object3D>
    {markerTool.ray && <Ray {...markerTool.ray} />}
    {handlePosition && <PositionHandle position={handlePosition}/> }
    </Object3D>;
};


MarkerTool.displayName = 'MarkerTool';
MarkerTool.defaultProps = {

};
export default MarkerTool;