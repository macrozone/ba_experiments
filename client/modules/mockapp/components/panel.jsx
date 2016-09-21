import React from 'react';
import withTheme from '/manul-utils/with_theme';
import PanelField from '../containers/panel_field';
import Progress from '../containers/progress';
import {Button, ButtonGroup, ProgressBar} from 'react-bootstrap';
const Styles = ({style, ...props}, theme) => {
  return {
    base: [
      {
        padding: 20
      },
      style // allow override
    ]
  };
};
const accuracyBsStyle = (accuracy) => {
  if (accuracy < 0.5) {
    return 'danger';
  }
  if (accuracy < 0.8) {
    return 'warning';
  }
  return 'success';

};
const Component = ({styles, nextSample, setCTSample, showRois, toggleRois, accuracy, classification}) => {

  return (
    <div style={styles.base}>
      <Button
        onClick={() => toggleRois()} bsStyle="default">
          {showRois ? 'Hide ROIs' : 'Show ROIs'}
      </Button>
      <br />
      <br />
      <PanelField label="Classification" value={classification}/>
      <PanelField label="Accuracy" value={
        <ProgressBar
          bsStyle={accuracyBsStyle(accuracy)}
          label={`${(accuracy * 100).toFixed(2)}%`}
          now={accuracy * 100}
        />
      }/>

      <ButtonGroup>
        <Button
          onClick={nextSample} bsStyle="primary">
            Next
        </Button>

        <Button
          onClick={setCTSample} bsStyle="default">
            CT Sample
        </Button>

      </ButtonGroup>
      <Progress />
    </div>
  );
};

const Panel = withTheme(Styles, Component);

Panel.propTypes = {
};

Panel.defaultProps = {
};

Panel.displayName = 'Panel';
Component.displayName = 'withTheme(Panel)';
export default Panel;
