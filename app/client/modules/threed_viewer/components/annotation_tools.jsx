import React from 'react';
import withTheme from '/lib/with_theme';

import { Button } from 'react-bootstrap';
import _ from 'lodash';

const Styles = ({ style, ...props }, theme) => ({
  base: [
    {

    },
    style, // allow override
  ],
});

const Component = ({ styles, startSphereAnnotation, currentAnnotationTool }) => (
  <div style={styles.base}>
    <Button
      disabled={_.get(currentAnnotationTool, 'type') === 'sphere'}
      onClick={startSphereAnnotation}
    >
      Sphere
    </Button>
  </div>
  );

const AnnotationTools = withTheme(Styles, Component);

AnnotationTools.propTypes = {
};

AnnotationTools.defaultProps = {
};

AnnotationTools.displayName = 'AnnotationTools';
Component.displayName = 'withTheme(AnnotationTools)';
export default AnnotationTools;
