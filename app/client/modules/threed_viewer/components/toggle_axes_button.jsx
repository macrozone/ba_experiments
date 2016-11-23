import React from 'react';
import withTheme from '/lib/with_theme';
import { Button, ButtonGroup, ProgressBar } from 'react-bootstrap';

const Styles = ({ style, ...props }, theme) => ({
  base: [
    {
      color: 'black',
    },
    style, // allow override
  ],
});

const Component = ({ styles, showAxes, toggleAxes }) => (
  <Button onClick={toggleAxes}>{showAxes ? 'hide axes' : 'show axes'}</Button>
  );

const ToggleAxesButton = withTheme(Styles, Component);

ToggleAxesButton.propTypes = {
};

ToggleAxesButton.defaultProps = {
};

ToggleAxesButton.displayName = 'ToggleAxesButton';
Component.displayName = 'withTheme(ToggleAxesButton)';
export default ToggleAxesButton;
