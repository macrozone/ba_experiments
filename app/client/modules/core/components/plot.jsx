import React from 'react';
import withTheme from '/manul-utils/with_theme';
import {Layer, Circle, Rect, Stage, Group} from 'react-konva';

const Styles = ({style, ...props}, theme) => {
  return {
    base: [
      {

      },
      style // allow override
    ]
  };
};

const colors = [ 'red', 'blue', 'orange' ];
const Point = ({x, y, theClass = null, isCenter}) => (
  <Circle x={x} y={y} radius={isCenter ? 4 : 2} fill={colors[theClass] || 'black'} />
);

const Component = ({styles, toggleRunning, running, width, height, addPoint, points, centers = []}) => {

  return (
    <div style={styles.base}>
      <button onClick={toggleRunning}>{running ? 'stop' : 'play'}</button>

        <div onClick={addPoint}>
          <Stage width={width} height={height} >
             <Layer>
             {
               points.map(
                 (p, index) => <Point key={index} {...p} />
               )
             }

             {
               centers.map(
                 (p, index) => <Point isCenter={true} key={index} {...p} />
               )
             }
             </Layer>
           </Stage>
        </div>
    </div>
  );
};

const Plot = withTheme(Styles, Component);

Plot.propTypes = {

};

Plot.defaultProps = {
};

Plot.displayName = 'Plot';
Component.displayName = 'withTheme(Plot)';
export default Plot;
