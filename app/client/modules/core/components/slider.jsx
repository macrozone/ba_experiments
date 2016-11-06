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

const Component = ({styles, step, min, max, label, value, setValue}) => {
  return (
    <div style={styles.base}>
      <p>{label}</p>
      <ReactBootstrapSlider
      step={step}
      min={min}
      max={max}
      value={value}
      change={({target: {value}}) => setValue(value)}
      />
    </div>
  );
};

const Slider = withTheme(Styles, Component);

Slider.propTypes = {
};

Slider.defaultProps = {
  step: 0.01,
  min: 0,
  max: 1
};

Slider.displayName = 'Slider';
Component.displayName = 'withTheme(Slider)';
export default Slider;
