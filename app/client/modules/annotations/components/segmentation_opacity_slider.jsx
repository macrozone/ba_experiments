import React from 'react';
import withTheme from '/manul-utils/with_theme';
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

const Component = ({styles, opacity, setOpacity}) => {
  return (
    <div style={styles.base}>
      <p>Segmentation opacity</p>
      <ReactBootstrapSlider
      step={0.01}
      min={0}
      max={1}
      value={opacity}
      change={({target: {value}}) => setOpacity(value)}
      />
    </div>
  );
};

const SegmentationOpacitySlider = withTheme(Styles, Component);

SegmentationOpacitySlider.propTypes = {
};

SegmentationOpacitySlider.defaultProps = {
};

SegmentationOpacitySlider.displayName = 'SegmentationOpacitySlider';
Component.displayName = 'withTheme(SegmentationOpacitySlider)';
export default SegmentationOpacitySlider;
