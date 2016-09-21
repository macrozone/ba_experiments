import React from 'react';
import withTheme from '/manul-utils/with_theme';
import {Layer, Line, Circle, Rect, Stage, Group} from 'react-konva';
import Color from 'color';
const Styles = ({style, ...props}, theme) => {
  return {
    base: [
      {
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

const Component = ({styles, lines, currentLineId, startNewLine, stopCurrentLine, draw}) => {
  const width = 800;
  const height = 600;
  return (
    <div

      style={styles.base}
      onMouseMove={
        (e) => currentLineId ? draw(currentLineId, e.nativeEvent.offsetX, e.nativeEvent.offsetY) : null}
      onMouseDown={startNewLine}
      onMouseUp={stopCurrentLine}>
      <Stage style={styles.canvas} width={width} height={height} >
        <Layer>
          {lines.map(({points, color}, index) => {
            const colorInstance = Color(color);
            return (
              <Line
                key={index}
                points={points}
                stroke={colorInstance.clearer(0.2).rgbString()}
                fill={colorInstance.clearer(0.8).rgbString()}
                closed tension={0} />
            );
          }
          )}

        </Layer>
     </Stage>
      <img style={styles.image} width={width} height={height} src="https://www.radiologie-leipzig.de/files/images/content/computertomographie/11_ct-abdomen.jpg" />
    </div>
  );
};

const Home = withTheme(Styles, Component);

Home.propTypes = {

};

Home.defaultProps = {
};

Home.displayName = 'Home';
Component.displayName = 'withTheme(Home)';
export default Home;
