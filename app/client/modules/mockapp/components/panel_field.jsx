import React from 'react';
import withTheme from '/lib/with_theme';

const Styles = ({style, ...props}, theme) => {
  return {
    base: [
      {
        marginBottom: 20
      },
      style // allow override
    ]
  };
};

const Component = ({styles, label, value}) => {
  return (
    <div style={styles.base}>
      <strong>{label}</strong>: {value}
    </div>
  );
};

const PanelField = withTheme(Styles, Component);

PanelField.propTypes = {
};

PanelField.defaultProps = {
};

PanelField.displayName = 'PanelField';
Component.displayName = 'withTheme(PanelField)';
export default PanelField;
