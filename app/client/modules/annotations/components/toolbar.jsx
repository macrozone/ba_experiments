import React from 'react';
import withTheme from '/manul-utils/with_theme';

import {Button, ButtonGroup, ProgressBar} from 'react-bootstrap';

const Styles = ({style, ...props}, theme) => {
  return {
    base: [
      {

      },
      style // allow override
    ]
  };
};

const Component = ({styles, tools, activateTool, currentToolId}) => {
  return (
    <div style={styles.base}>
    {
      tools.map(({_id, label}) => (
        <Button disabled={currentToolId === _id} key={_id} onClick={() => activateTool(_id)}>{label}</Button>
      ))
    }
    </div>
  );
};

const Toolbar = withTheme(Styles, Component);

Toolbar.propTypes = {
};

Toolbar.defaultProps = {
};

Toolbar.displayName = 'Toolbar';
Component.displayName = 'withTheme(Toolbar)';
export default Toolbar;
