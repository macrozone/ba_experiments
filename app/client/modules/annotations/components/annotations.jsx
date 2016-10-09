import React from 'react';

import {Rect, Group} from 'react-konva';

import Polygon from '../components/polygon';
import Circle from '../components/circle';
import _ from 'lodash';
import {distance} from '../libs/vector_tools';
const Annotations = ({
    annotations,
    currentEditingAnnotation,
    deleteAnnotation,
    altKey,
    cursorPosition,
    stopEditingCurrentAnnotation,
    currentToolId,
    createAnnotation,
    updateAnnotation,
    width, height
  }) => {

  const componentMap = {
    circle: Circle,
    polygon: Polygon
  };
  const renderAnnotation = ({_id, type, color, props}) => {
    const isCurrent = currentEditingAnnotation && currentEditingAnnotation._id === _id;
    const onClick = (e) => {
      if (altKey) {
        e.cancelBubble = true;
        deleteAnnotation(_id);
      }
    };

    const Component = componentMap[type];
    if (!Component) {
      console.error('unknown annotation type', _id, type);
    }
    return <Component
      onClick={onClick}
      isCurrent={isCurrent}
      zIndex={isCurrent ? 10 : 0}
      cursorPosition={cursorPosition}
      key={_id}
      draggable
      color={color}
      props={props}
      stopEditingCurrentAnnotation={stopEditingCurrentAnnotation}
    />;
  };


  const drawPolygon = (x,y) => {

    if (!currentEditingAnnotation) {
      createAnnotation('polygon', {points: [ x,y ]});
    } else {
      updateAnnotation(currentEditingAnnotation._id, {$push: {'props.points': {$each: [ x,y ]}}});
    }
  };


  const drawCircle = (x,y) => {

    if (!currentEditingAnnotation) {
      createAnnotation('circle', {point: {x,y}, radius: 50});
    } else {
      const radius = distance(currentEditingAnnotation.props.point, {x,y});
      updateAnnotation(currentEditingAnnotation._id, {$set: {'props.radius': radius}});
      stopEditingCurrentAnnotation();
    }
  };

  const toolEventMap = {
    polygon: {
      onClick: ({evt}) => drawPolygon(evt.x, evt.y),
      onMousemove: _.throttle(
        e => e.evt.which ? drawPolygon(e.evt.x, e.evt.y) : null
      , 60)
    },
    circle: {
      onClick: ({evt}) => drawCircle(evt.x, evt.y),
    }
  };

  const toolEvents = toolEventMap[currentToolId];


  return (
    <Group {...toolEvents}>
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
