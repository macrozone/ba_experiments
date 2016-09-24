import React from 'react';
import withTheme from '/manul-utils/with_theme';
import {ProgressBar} from 'react-bootstrap';
const Styles = ({style, ...props}, theme) => {
  return {
    base: [
      {
        marginTop: 20,
      },
      style // allow override
    ]
  };
};

const Component = ({styles, progress, label}) => {
  return (
    <div style={styles.base}>
    <p>Progress</p>
      <ProgressBar now={progress} label={label} />
    </div>
  );
};

const Progress = withTheme(Styles, Component);

Progress.propTypes = {
};

Progress.defaultProps = {
};

Progress.displayName = 'Progress';
Component.displayName = 'withTheme(Progress)';
export default Progress;
