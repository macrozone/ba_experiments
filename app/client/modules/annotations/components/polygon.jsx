import React from 'react';
import {Layer, Line, Circle, Rect, Stage, Group} from 'react-konva';
import Color from 'color';
const Polygon = ({isCurrent, isSelected, color, cursorPosition, props: {points, tension},onClick, stopEditingCurrentAnnotation, draggable}) => {
  const colorInstance = Color(color);
  const colors = {
    stroke: colorInstance.fade(0.2).rgb().string(),
    fill: colorInstance.fade(isSelected ? 0.5 : 0.8).rgb().string()
  };

  return <Group draggable={draggable}>
    <Line
      points={isCurrent ? [ ...points, cursorPosition.x, cursorPosition.y ] : points}
      onClick={onClick}
      {...colors}
      tension={tension}
      closed={!isCurrent}
       />
    {
      isCurrent ?
    <Circle
      radius={5}
      x={points[0]}
      y={points[1]}
      onClick={(e) => {e.cancelBubble = true; stopEditingCurrentAnnotation();}}
      {...colors}/> : null
    }
  </Group>;
};


Polygon.propTypes = {
};

Polygon.defaultProps = {
};

Polygon.displayName = 'Polygon';
export default Polygon;
