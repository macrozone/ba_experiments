import React from 'react';
import {Layer, Line, Circle, Rect, Stage, Group} from 'react-konva';
import Color from 'color';

import {distance} from '../libs/vector_tools';

const CircleAnnotation = ({isCurrent, isSelected, color, cursorPosition, onClick, props, draggable}) => {
  const {point, radius} = props;
  const colorInstance = Color(color);
  const colors = {
    stroke: colorInstance.clearer(0.2).rgbString(),
    fill: colorInstance.clearer(isSelected ? 0.5 : 0.8).rgbString()
  };

  return (
    <Circle
      {...point}
      radius={isCurrent ? distance(props.point, cursorPosition) : radius}
      onClick={onClick}
      {...colors}
       />
     );
};


CircleAnnotation.propTypes = {
};

CircleAnnotation.defaultProps = {
};

CircleAnnotation.displayName = 'Circle';
export default CircleAnnotation;
