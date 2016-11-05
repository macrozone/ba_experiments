import React from 'react';
import withTheme from '/manul-utils/with_theme';
import _ from 'lodash';

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

const CameraControlField = ({camera, property, setCameraProp}) => (
  <div>
    <p>{property}</p>
    <input
      type="number"
      onChange={(e) => {e.stopPropagation(); setCameraProp(property, e.target.value);}}
      value={_.get(camera, property)}/>
  </div>

);

const Component = ({styles, camera, setCameraProp, setFrontal, setTransversal, setSagittal}) => {
  return (
    <div style={styles.base}>
      <button onClick={setFrontal}>Frontal</button>
      <button onClick={setTransversal}>Transversal</button>
      <button onClick={setSagittal}>Sagittal</button>
      <CameraControlField property="position.x" camera={camera} setCameraProp={setCameraProp} />
      <CameraControlField property="position.y" camera={camera} setCameraProp={setCameraProp} />
      <CameraControlField property="position.z" camera={camera} setCameraProp={setCameraProp} />
      <CameraControlField property="rotation._x" camera={camera} setCameraProp={setCameraProp} />
      <CameraControlField property="rotation._y" camera={camera} setCameraProp={setCameraProp} />
      <CameraControlField property="rotation._z" camera={camera} setCameraProp={setCameraProp} />
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
