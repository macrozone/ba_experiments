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

const Component = ({styles, showAxes, toggleAxes}) => {
  return (
    <button onClick={toggleAxes}>{showAxes ? 'hide axes' : 'show axes'}</button>
  );
};

const ToggleAxesButton = withTheme(Styles, Component);

ToggleAxesButton.propTypes = {
};

ToggleAxesButton.defaultProps = {
};

ToggleAxesButton.displayName = 'ToggleAxesButton';
Component.displayName = 'withTheme(ToggleAxesButton)';
export default ToggleAxesButton;
