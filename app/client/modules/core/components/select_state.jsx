import React from 'react';
import withTheme from '/lib/with_theme';


const Styles = ({style, ...props}, theme) => {
  return {
    base: [
      {

      },
      style // allow override
    ],
    label: {
      color: 'white'
    }
  };
};


const Component = ({styles, options, label, value, setValue}) => {
  return (
    <div style={styles.base}>
      <p style={styles.label}>{label}</p>
      <select value={value} onChange={(event) => setValue(event.target.value)}>
        {options.map(
          ({value, label}) => <option key={value} value={value}>{label}</option>
        )}
      </select>
    </div>
  );
};

const SelectState = withTheme(Styles, Component);

SelectState.propTypes = {
};

SelectState.defaultProps = {
  step: 0.01,
  min: 0,
  max: 1
};

SelectState.displayName = 'SelectState';
Component.displayName = 'withTheme(SelectState)';
export default SelectState;
