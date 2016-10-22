import React from 'react';
import withTheme from '/manul-utils/with_theme';
import _ from 'lodash';

import ReactBootstrapSlider from 'react-bootstrap-slider';
const Styles = ({style, ...props}, theme) => {
  return {
    base: [
      {

      },
      style // allow override
    ]
  };
};

const Component = ({styles, setRegionSize, regionSize}) => {
  return (
    <div style={styles.base}>
      <p>Segmentation size</p>
      <ReactBootstrapSlider
      step={1}
      min={5}
      max={100}
      value={regionSize}
      change={_.debounce(({target: {value}}) => setRegionSize(value), 300)}
      />
    </div>
  );
};

const RegionSizeSlider = withTheme(Styles, Component);

RegionSizeSlider.propTypes = {
};

RegionSizeSlider.defaultProps = {
};

RegionSizeSlider.displayName = 'RegionSizeSlider';
Component.displayName = 'withTheme(RegionSizeSlider)';
export default RegionSizeSlider;
