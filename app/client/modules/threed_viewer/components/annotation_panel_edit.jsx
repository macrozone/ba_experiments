import React from 'react';

import withTheme from '/lib/with_theme';

import LabelSelect from '../../core/containers/label_select';
import { Button } from 'react-bootstrap';

const Styles = ({ style, ...props }, theme) => {
  return {
    base: [
      {
        color: 'white',
      },
      style, // allow override
    ],
  };
};

const Component = ({ styles, setAnnotationLabelId, deleteAnnotation, annotation }) => {
  return (
    <div style={styles.base}>
      <p>Edit selected annotation</p>
      <LabelSelect
        onChange={newLabelId => setAnnotationLabelId(annotation._id, newLabelId)}
        labelId={annotation.labelId}
      />
      <Button onClick={() => deleteAnnotation(annotation._id)} >Remove Annotation</Button>
      <Button onClick={() => setAnnotationLabelId(null)} >Unselect Annotation</Button>
    </div>
  );
};

const AnnotationPanelEdit = withTheme(Styles, Component);

AnnotationPanelEdit.propTypes = {
};

AnnotationPanelEdit.defaultProps = {
};

AnnotationPanelEdit.displayName = 'AnnotationPanelEdit';
Component.displayName = 'withTheme(AnnotationPanelEdit)';
export default AnnotationPanelEdit;
