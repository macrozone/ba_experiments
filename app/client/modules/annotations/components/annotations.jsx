import React from 'react';

import {Rect, Group} from 'react-konva';

import Polygon from '../components/polygon';
import Circle from '../components/circle';
import Bitmap from '../containers/bitmap';
import _ from 'lodash';
const componentMap = {
  circle: Circle,
  polygon: Polygon,
  bitmap: Bitmap
};


const Annotations = ({
    annotations,
    currentEditingAnnotation,
    deleteAnnotation,
    altKey,
    cursorPosition,
    stopEditingCurrentAnnotation,
    toolEvents,
    width, height
  }) => {

  const renderAnnotation = ({_id, type, color, props}) => {
    const isCurrent = currentEditingAnnotation && currentEditingAnnotation._id === _id;
    const onClick = (e) => {
      console.log(e);
      if (altKey) {
        e.cancelBubble = true;
        deleteAnnotation(_id);
      }
    };

    const Component = componentMap[type];
    if (!Component) {
      console.error('unknown annotation type', _id, type);
    } else {
      return <Component
      onClick={onClick}
      isCurrent={isCurrent}
      zIndex={isCurrent ? 10 : 0}
      cursorPosition={cursorPosition}
      key={_id}
      color={color}
      props={props}
      stopEditingCurrentAnnotation={stopEditingCurrentAnnotation}
    />;
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
