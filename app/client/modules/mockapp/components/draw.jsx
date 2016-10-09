import React from 'react';
import withTheme from '/manul-utils/with_theme';
import {Layer, Line, Circle, Rect, Stage, Group} from 'react-konva';
import Color from 'color';
const Styles = ({style, altKey}, theme) => {
  return {
    base: [
      {
        cursor: altKey ? 'not-allowed' : 'auto',
        position: 'relative'
      },
      style // allow override
    ],
    image: {

    },
    canvas: {

      position: 'absolute',
      top: 0,
      left: 0
    }
  };
};

const Component = ({styles, altKey, deleteAnnotation, cursorPosition, showAnnotations, image, annotations, currentAnnotationId, startNewAnnotation, stopCurrentAnnotation, draw}) => {
  const width = 800;
  const height = 600;
  const freehandEvents = {
    onMouseMove: (e) => currentAnnotationId ? draw(currentAnnotationId, e.nativeEvent.offsetX, e.nativeEvent.offsetY) : null,
    onMouseDown: startNewAnnotation,
    onMouseUp: stopCurrentAnnotation
  };

  const polygonEvents = {
    onClick: (e) => draw(currentAnnotationId, e.nativeEvent.offsetX, e.nativeEvent.offsetY)
  };

  return (
    <div
      {...polygonEvents}
      style={styles.base}

      >
      <Stage style={styles.canvas} width={width} height={height} >
        <Layer>
          {showAnnotations ? annotations.map(({_id, points, color, tension}, index) => {
            const colorInstance = Color(color);
            const isCurrent = currentAnnotationId === _id;
            const colors = {
              stroke:colorInstance.clearer(0.2).rgbString(),
              fill:colorInstance.clearer(altKey ? 0.5 : 0.8).rgbString()
            };
            return [
              <Line
                key={index}
                points={isCurrent ? [ ...points, cursorPosition.x, cursorPosition.y ] : points}
                onClick={() => altKey ? deleteAnnotation(_id) : null}
                {...colors}
                tension={tension}
                closed={!isCurrent}
                 />,
              isCurrent ?
              <Circle
                radius={5}
                x={points[0]}
                y={points[1]}
                onClick={stopCurrentAnnotation}
                {...colors}/> : null
            ];
          }
        ) : null}

        </Layer>
     </Stage>
      <img style={styles.image} width={width} height={height} src={image} />
    </div>
  );
};

const Draw = withTheme(Styles, Component);

Draw.propTypes = {

};

Draw.defaultProps = {
};

Draw.displayName = 'Draw';
Component.displayName = 'withTheme(Draw)';
export default Draw;
