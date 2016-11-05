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
        max={1}
        min={0.01}
        step={0.01}
        localState="pet_3_d_viewer.opacity"
        debounce={300}
        />
      <Slider
        label="minSuv"
        max={0.01}
        min={0.0001}
        step={0.0001}
        localState="pet_3_d_viewer.min_suv"
        debounce={300}
        />
      <Slider
        label="maxSuv"
        max={0.01}
        min={0.0001}
        step={0.0001}
        localState="pet_3_d_viewer.max_suv"
        debounce={300}
        />
        <Slider
          label="Point size"
          max={2}
          min={0.01}
          step={0.1}
          localState="pet_3_d_viewer.point_size"
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
