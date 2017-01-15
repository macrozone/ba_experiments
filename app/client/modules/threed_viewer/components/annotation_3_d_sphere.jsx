import React from 'react';
import THREE from 'three';
import { Mesh } from 'react-three';

import Color from 'color';

const getColor = (color, highlight) => (
  highlight ? Color(color).lighten(0.75).rgb().string() : color
);


const Annotation3DSphere = ({ annotation, label, intersected, checkIntersection, isSelected, blink }) => (
  <Mesh
    ref={mesh => checkIntersection(mesh)}
    position={annotation.props.position}
    geometry={new THREE.SphereBufferGeometry(annotation.props.radius, 32, 32)}
    material={new THREE.MeshBasicMaterial({
      color: new THREE.Color(
        blink ? Color(label.color).lighten(1).rgb().string() :
        (
          intersected ? Color(label.color).lighten(0.75).rgb().string() :
          label.color
        )
      ),
      opacity: 0.5,
      transparent: true,
      depthTest: false,
      blending: THREE.NormalBlending,
    })}
  />
);


Annotation3DSphere.propTypes = {
};

Annotation3DSphere.defaultProps = {
};

Annotation3DSphere.displayName = 'Annotation3DSphere';
export default Annotation3DSphere;
