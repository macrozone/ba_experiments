import React from 'react';
import {Renderer, Scene, Mesh, Line, Object3D, ArrowHelper} from 'react-three';
import THREE from 'three';

const Point = ({position}) => {

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

const Marker = ({camera, marker, ray}) => {
  // we want to show a marker on the line where the mouse-cursor is.
  // The user does not need to point directly on the line,
  // instead the mouse cursor can be below or above the line and we want to show
  // the cursor on this vertical line.

  // in order to do so, we need a plane that we can intersect with the already drawn line
  // this plane needs to fulfill these reqirements:
  // - is parallel to "camera-up".
  // - contains the current ray from the raycaster (point from camera to mouse-cursor)

  // to construct this plane we need the hessian normal form it

  // the hessian normal form needs a (oriented and normed) normal-vector n0 and
  // a distance d of the plane to the origin of the coordinate system

  // to start with, we need a normal vector n of this plane and a support-vector p
  // p is simply the ray's origin
  const p = new THREE.Vector3(ray.origin.x, ray.origin.y, ray.origin.z);

  // n needs to be normal to the resulting plane. Because the plane needs to contain the ray,
  // n needs to be normal to this ray as well, but n needs also to be normal to camera-up.
  // this can be calculate with the cross-product of the ray-direction with camera-up:

  const up = new THREE.Vector3(0,1,0);
  const cameraUp = up.applyQuaternion(new THREE.Quaternion(
    camera.quaternion._x, camera.quaternion._y, camera.quaternion._z, camera.quaternion._w
  ));
  const n = cameraUp.cross(ray.direction);

  // we need to norm it:
  const dotProduct = p.dot(n);

  const n0 = dotProduct > 0 ? n.normalize() : n.normalize().negate();

  // d is now dot product of p and n0
  const d = -p.dot(n0);

  // no we got our plane
  const plane = new THREE.Plane(n0, d);
  // and the intersection
  const intersection = new THREE.Ray().copy(marker.ray).intersectPlane(plane);

  return <Object3D>
    <Ray {...marker.ray} />

    {intersection && <Point position={intersection}/> }
    </Object3D>;
};


const Markers = ({width, height, ray, camera, markers}) => {

  return (
    <Object3D>

    {
      markers.map((marker, index) => (
        <Marker
        marker={marker}
        width={width}
        height={height}
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
