import React from 'react';

import { Rect, Group } from 'react-konva';

import Polygon from '../components/polygon';
import Circle from '../components/circle';
import Bitmap from '../containers/bitmap';


const componentMap = {
  circle2d: Circle,
  polygon2d: Polygon,
  bitmap2d: Bitmap,
};

const Annotations = ({
    annotations,
    currentEditingAnnotation,
    deleteAnnotation,
    altKey,
    cursorPosition,
    stopEditingCurrentAnnotation,
    toolEvents,
    width, height,
  }) => {
  const renderAnnotation = ({ _id, type, label = null, props }) => {
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
    } else {
      return (
        <Component
          onClick={onClick}
          isCurrent={isCurrent}
          zIndex={isCurrent ? 10 : 0}
          cursorPosition={cursorPosition}
          key={_id}
          color={label ? label.color : 'white'}
          props={props}
          stopEditingCurrentAnnotation={stopEditingCurrentAnnotation}
        />
      );
    }
  };

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
