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

const Component = ({styles, altKey, deleteRoi, showRois, image, rois, currentRoiId, startNewRoi, stopCurrentRoi, draw}) => {
  const width = 800;
  const height = 600;


  return (
    <div

      style={styles.base}
      onMouseMove={
        (e) => currentRoiId ? draw(currentRoiId, e.nativeEvent.offsetX, e.nativeEvent.offsetY) : null}
      onMouseDown={startNewRoi}
      onMouseUp={stopCurrentRoi}>
      <Stage style={styles.canvas} width={width} height={height} >
        <Layer>
          {showRois ? rois.map(({_id, points, color}, index) => {
            const colorInstance = Color(color);
            return (
              <Line
                key={index}
                points={points}
                onClick={() => altKey ? deleteRoi(_id) : null}
                stroke={colorInstance.clearer(0.2).rgbString()}
                fill={colorInstance.clearer(altKey ? 0.5 : 0.8).rgbString()}
                closed tension={0} />
              );
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
