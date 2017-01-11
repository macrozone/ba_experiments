import THREE from 'three';

export default ({ camera, markerRay, cameraRay }) => {
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
  const p = new THREE.Vector3(cameraRay.origin.x, cameraRay.origin.y, cameraRay.origin.z);

  // n needs to be normal to the resulting plane. Because the plane needs to contain the ray,
  // n needs to be normal to this ray as well, but n needs also to be normal to camera-up.
  // this can be calculate with the cross-product of the ray-direction with camera-up:

  const up = new THREE.Vector3(0, 1, 0);
  // up would be enough, but if the camera is exactly on top of the model, it will break
  // that's why we take the cameras rotation into account
  const cameraUp = up.applyQuaternion(new THREE.Quaternion(
    camera.quaternion._x, camera.quaternion._y, camera.quaternion._z, camera.quaternion._w
  ));

  const n = cameraUp.cross(cameraRay.direction);

  // we need to norm and orient it:
  const dotProduct = p.dot(n);

  const n0 = dotProduct > 0 ? n.normalize() : n.normalize().negate();

  // d is now dot product of p and n0
  const d = -p.dot(n0);

  // no we got our plane
  const plane = new THREE.Plane(n0, d);
  // and the intersection
  return new THREE.Ray().copy(markerRay).intersectPlane(plane);
};
