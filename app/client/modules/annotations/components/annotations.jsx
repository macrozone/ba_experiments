import React from 'react';

import {Layer, Line, Circle, Rect, Stage, Group} from 'react-konva';

import Polygon from '../components/polygon';
import _ from 'lodash';
const Annotations = ({
    annotations,
    currentEditingAnnotation,
    deleteAnnotation,
    altKey,
    cursorPosition,
    stopEditingCurrentAnnotation,
    currentToolId,
    drawPolygon,
    width, height
  }) => {
  const renderAnnotation = ({_id, color, props}) => {
    const isCurrent = currentEditingAnnotation && currentEditingAnnotation._id === _id;
    const onClick = () => altKey ? deleteAnnotation(_id) : null;
    return <Polygon
      onClick={onClick}
      isCurrent={isCurrent}
      zIndex={isCurrent ? 10 : 0}
      cursorPosition={cursorPosition}
      key={_id}
      color={color}
      props={props}
      stopEditingCurrentAnnotation={stopEditingCurrentAnnotation}
    />;
  };



  const polygonEvents = {
    onClick: ({evt}) => drawPolygon(evt.x, evt.y),
    onMousemove: _.throttle(
      e => e.evt.which ? drawPolygon(e.evt.x, e.evt.y) : null
    , 60)
  };


  return (
    <Group {...polygonEvents}>
      <Rect
        width={width}
        height={height}
      />
      {annotations.map(renderAnnotation)}

    </Group>
  );
};
Annotations.propTypes = {
};

Annotations.defaultProps = {
};

Annotations.displayName = 'Annotations';
export default Annotations;
