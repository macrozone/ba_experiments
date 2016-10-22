import React from 'react';
import withTheme from '/manul-utils/with_theme';
import OpacitySlider from '../containers/opacity_slider';
import RegionSizeSlider from '../containers/region_size_slider';
const Styles = ({style, ...props}, theme) => {
  return {
    base: [
      {

      },
      style // allow override
    ]
  };
};

const Component = ({styles, ...props}) => {
  return (
    <div style={styles.base}>
      <OpacitySlider />
      <RegionSizeSlider />
    </div>
  );
};

const Options = withTheme(Styles, Component);

Options.propTypes = {
};

Options.defaultProps = {
};

Options.displayName = 'Options';
Component.displayName = 'withTheme(Options)';
export default Options;
