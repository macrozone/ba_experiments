import { Mesh, Object3D } from 'react-three';
import React from 'react';
import THREE from 'three';

import Annotation3DSphere from '../containers/annotation_3_d_sphere';

const Annotations3D = ({ selectAnnotation, selectedAnnotationId, annotationsWithLabels }) => (
  <Object3D>
    {
      annotationsWithLabels.map(
        ({ annotation, label }, index) => (
          <Annotation3DSphere
            key={index}
            annotation={annotation}
            label={label}
            isSelected={selectedAnnotationId === annotation._id}
            onClick={() => selectAnnotation(annotation._id)}
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
