import React from 'react';
import withTheme from '/manul-utils/with_theme';
import Slider from '/client/modules/core/containers/slider';
import SelectAxis from '../containers/select_axis';
import ToggleAxesButton from '../containers/toggle_axes_button';
const Styles = ({style, ...props}, theme) => {
  return {
    base: [
      {

      },
      style // allow override
    ]
  };
};

const Component = ({styles}) => {
  return (
    <div style={styles.base}>
      <Slider
        label="opacity"
        max={0.3}
        min={0.01}
        step={0.01}
        localState="pet_3_d_viewer.opacity"
        debounce={300}
        />
      <SelectAxis />
      <ToggleAxesButton />
    </div>
  );
};

const Pet3DViewerPanel = withTheme(Styles, Component);

Pet3DViewerPanel.propTypes = {
};

Pet3DViewerPanel.defaultProps = {
};

Pet3DViewerPanel.displayName = 'Pet3DViewerPanel';
Component.displayName = 'withTheme(Pet3DViewerPanel)';
export default Pet3DViewerPanel;
