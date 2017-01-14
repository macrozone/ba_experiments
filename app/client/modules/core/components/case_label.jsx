import React from 'react';
import withTheme from '/lib/with_theme';

const Styles = ({ style, ...props }, theme) => {
  return {
    base: [
      {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
      },
      style, // allow override
    ],
  };
};


const Component = ({ styles, title }) => {
  return (
    <p style={styles.base} name="case-label">
      {title}
    </p>
  );
};

const CaseLabel = withTheme(Styles, Component);

CaseLabel.propTypes = {
};

CaseLabel.defaultProps = {
};

CaseLabel.displayName = 'CaseLabel';
Component.displayName = 'withTheme(CaseLabel)';
export default CaseLabel;
