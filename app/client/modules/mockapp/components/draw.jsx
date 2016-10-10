import React from 'react';
import withTheme from '/manul-utils/with_theme';
import {Layer, Line, Circle, Rect, Stage, Group, Image} from 'react-konva';
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

const Component = ({styles, showAnnotations, width, height,image, segmentationOpacity, getLabelForClick, segmentation, cursorPosition}) => {

  return (
    <div
      style={{...styles.base, width, height}}
      >
      <Stage style={styles.canvas} width={width} height={height} >
        <Layer>
          <Image image={image} />
        </Layer>
        <Layer>
          <Image
            opacity={segmentationOpacity}
            image={segmentation.image}
            onClick={({target, evt: {x,y}}) => {
              console.log(x,y);
              console.log(target);
              const label = getLabelForClick(x,y);
              console.log(label);
            }}
            />
        </Layer>
        <Layer>
          { showAnnotations ?
            <Annotations width={width} height={height} cursorPosition={cursorPosition}/> :
            null}
        </Layer>

     </Stage>

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
