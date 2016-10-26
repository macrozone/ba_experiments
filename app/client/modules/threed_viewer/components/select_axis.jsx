import React from 'react';
import withTheme from '/manul-utils/with_theme';


const Styles = ({style, ...props}, theme) => {
  return {
    base: [
      {
        color: 'black'
      },
      style // allow override
    ]
  };
};

const Component = ({styles, setFrontal, setTransversal, setSagittal, setCameraUpX, setCameraUpY, setCameraUpZ, cameraUp}) => {
  return (
    <div style={styles.base}>
      <button onClick={setFrontal}>Frontal</button>
      <button onClick={setTransversal}>Transversal</button>
      <button onClick={setSagittal}>Sagittal</button>
      <input
        type="number"
        onChange={(e) => setCameraUpX(parseFloat(e.target.value))}
        value={cameraUp[0]}/>
      <input
        type="number"
        onChange={(e) => setCameraUpY(parseFloat(e.target.value))}
        value={cameraUp[1]}/>
      <input
        type="number"
        onChange={(e) => setCameraUpZ(parseFloat(e.target.value))}
        value={cameraUp[2]}/>
    </div>
  );
};

const SelectAxis = withTheme(Styles, Component);

SelectAxis.propTypes = {
};

SelectAxis.defaultProps = {
};

SelectAxis.displayName = 'SelectAxis';
Component.displayName = 'withTheme(SelectAxis)';
export default SelectAxis;
