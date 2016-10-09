import React from 'react';
import withTheme from '/manul-utils/with_theme';
import {Layer, Line, Circle, Rect, Stage, Group} from 'react-konva';
import Color from 'color';
import Annotations from '/client/modules/annotations/containers/annotations';
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

const Component = ({styles, showAnnotations, image, cursorPosition, currentToolId}) => {
  const width = 800;
  const height = 600;


  return (
    <div
      style={styles.base}
      >
      <Stage style={styles.canvas} width={width} height={height} >
        <Layer>
          { showAnnotations ? <Annotations width={width} height={height} cursorPosition={cursorPosition}/> : null}
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
