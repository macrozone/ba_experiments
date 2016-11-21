import React from 'react';
import { Object3D } from 'react-three';
import _ from 'lodash';
import THREE from 'three';

import SphereAnnotationTool from '../containers/sphere_annotation_tool';

const AnnotationTools3D = ({ currentAnnotationTool }) => (
  <Object3D>
    {
    _.get(currentAnnotationTool, 'type') === 'sphere' ?
      <SphereAnnotationTool /> :
      null
  }
  </Object3D>
);
AnnotationTools3D.displayName = 'AnnotationTools3D';

export default AnnotationTools3D;
