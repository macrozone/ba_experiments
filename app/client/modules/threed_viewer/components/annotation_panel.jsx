import React from 'react';

import withTheme from '/lib/with_theme';

import AnnotationPanelCreate from '../containers/annotation_panel_create';
import AnnotationPanelEdit from '../containers/annotation_panel_edit';

const Styles = ({ style, ...props }, theme) => {
  return {
    base: [
      {
        marginBottom: 30,
      },
      style, // allow override
    ],
  };
};

const Component = ({ styles, caseId, selectedAnnotation }) => {
  return (
    <div style={styles.base}>
      {
        selectedAnnotation ?
          <AnnotationPanelEdit annotation={selectedAnnotation} /> :
            <AnnotationPanelCreate />
      }
    </div>
  );
};

const AnnotationPanel = withTheme(Styles, Component);

AnnotationPanel.propTypes = {
};

AnnotationPanel.defaultProps = {
};

AnnotationPanel.displayName = 'AnnotationPanel';
Component.displayName = 'withTheme(AnnotationPanel)';
export default AnnotationPanel;
