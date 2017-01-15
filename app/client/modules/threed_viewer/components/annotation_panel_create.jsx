import React from 'react';
import withTheme from '/lib/with_theme';
import LabelSelect from '/client/modules/core/containers/label_select';
import { Button } from 'react-bootstrap';
import _ from 'lodash';

const Styles = ({ style, ...props }, theme) => ({
  base: [
    {

    },
    style, // allow override
  ],
  title: {
    fontWeight: 'bold',
    color: 'white',
  },
  toolButtons: {
    marginTop: 10,
  },
});

const alreadySelected = (currentTool, type) => _.get(currentTool, 'type') === type;

const Component = ({ styles, startSphereAnnotation, currentAnnotationTool, clearCurrentTool, setCurrentLabel, currentLabelId }) => (
  <div style={styles.base}>
    <p style={styles.title}>Create Annotation:</p>
    <LabelSelect onChange={setCurrentLabel} labelId={currentLabelId} />
    <div style={styles.toolButtons}>
      <Button

        onClick={
        alreadySelected(currentAnnotationTool, 'sphere') ?
        clearCurrentTool :
        startSphereAnnotation
      }
      >
        {
        alreadySelected(currentAnnotationTool, 'sphere') ?
        'Cancel annotation' :
        'Sphere annotation'
      }
      </Button>
    </div>
  </div>
  );

const AnnotationPanelCreate = withTheme(Styles, Component);

AnnotationPanelCreate.propTypes = {
};

AnnotationPanelCreate.defaultProps = {
};

AnnotationPanelCreate.displayName = 'AnnotationPanelCreate';
Component.displayName = 'withTheme(AnnotationPanelCreate)';
export default AnnotationPanelCreate;
