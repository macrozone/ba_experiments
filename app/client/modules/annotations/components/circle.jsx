import React from 'react';
import {Layer, Line, Circle, Rect, Stage, Group} from 'react-konva';
import Color from 'color';
const CircleAnnotation = ({isCurrent, isSelected, color, points, cursorPosition, tension,onClick, stopCurrentAnnotation}) => {
  const colorInstance = Color(color);
  const colors = {
    stroke: colorInstance.clearer(0.2).rgbString(),
    fill: colorInstance.clearer(isSelected ? 0.5 : 0.8).rgbString()
  };
  return (
    <Circle
      points={isCurrent ? [ ...points, cursorPosition.x, cursorPosition.y ] : points}
      onClick={onClick}
      {...colors}
      tension={tension}
      closed={!isCurrent}
       />
     );
};


CircleAnnotation.propTypes = {
};

CircleAnnotation.defaultProps = {
};

CircleAnnotation.displayName = 'Circle';
export default CircleAnnotation;
