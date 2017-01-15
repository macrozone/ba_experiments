import React from 'react';

import THREE from 'three';
import { Renderer, Scene, Mesh, Line, Object3D } from 'react-three';

const Annotations3D = ({ annotationsWithLabels }) => (
  <Object3D>
    {
      annotationsWithLabels.map(
        ({ annotation, label }) => (
          <Mesh
            position={annotation.props.position}
            geometry={new THREE.SphereBufferGeometry(annotation.props.radius, 32, 32)}
            material={new THREE.MeshBasicMaterial({
              color: new THREE.Color(label && label.color),
              opacity: 0.5,
              transparent: true,
              depthTest: false,
              blending: THREE.NormalBlending,
            })}
          />
        )
      )
    }
  </Object3D>
  );


Annotations3D.propTypes = {
};

Annotations3D.defaultProps = {
};

Annotations3D.displayName = 'Annotations3D';
export default Annotations3D;
