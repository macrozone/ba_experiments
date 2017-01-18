import React from 'react';
import withTheme from '/lib/with_theme';
import PanelField from '../containers/panel_field';
import Progress from '../containers/progress';
import AnnotationToolBar from '/client/modules/annotations/containers/toolbar';
import { Button, ButtonGroup, ProgressBar } from 'react-bootstrap';
import SegmentationOptions from '/client/modules/segmentation/containers/options';
import LabelSelect from '/client/modules/core/containers/label_select';

const Styles = ({ style, ...props }, theme) => ({
  base: [
    {
      padding: 20,
    },
    style, // allow override
  ],
});
const accuracyBsStyle = (accuracy) => {
  if (accuracy < 0.5) {
    return 'danger';
  }
  if (accuracy < 0.8) {
    return 'warning';
  }
  return 'success';
};
const Component = ({ styles, nextSample, setCTSample, showAnnotations, toggleAnnotations, accuracy, classification, currentLabelId, setCurrentLabel }) => (
  <div style={styles.base}>
    <Button
      onClick={() => toggleAnnotations()} bsStyle="default"
    >
      {showAnnotations ? 'Hide Annotations' : 'Show Annotations'}
    </Button>
    <br />
    <br />
    <PanelField label="Classification" value={classification} />
    <PanelField
      label="Accuracy" value={
        <ProgressBar
          bsStyle={accuracyBsStyle(accuracy)}
          label={`${(accuracy * 100).toFixed(2)}%`}
          now={accuracy * 100}
        />
      }
    />
    <LabelSelect labelId={currentLabelId} onChange={setCurrentLabel} />
    <AnnotationToolBar />

    <SegmentationOptions />
    <ButtonGroup>
      <Button
        onClick={nextSample} bsStyle="primary"
      >
            Next
      </Button>

      <Button
        onClick={setCTSample} bsStyle="default"
      >
            CT Sample
      </Button>

    </ButtonGroup>
    <Progress />
  </div>
  );

const Panel = withTheme(Styles, Component);

Panel.propTypes = {
};

Panel.defaultProps = {
};

Panel.displayName = 'Panel';
Component.displayName = 'withTheme(Panel)';
export default Panel;
