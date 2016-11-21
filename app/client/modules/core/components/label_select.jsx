import React from 'react';
import withTheme from '/manul-utils/with_theme';
import Select from 'react-select';

const Styles = ({ style, ...props }, theme) => ({
  base: [
    {

    },
    style, // allow override
  ],
});

const Component = ({ styles, labels, setCurrentLabel, currentLabelId }) => (
  <div style={styles.base}>
    <Select
      onChange={(label) => {
        setCurrentLabel(label._id);
      }}
      optionRenderer={label => (
        <span style={{ color: label.color }}>{label.name}</span>
      )}
      valueRenderer={label => (
        <span style={{ color: label.color }}>{label.name}</span>
      )}
      value={labels.find(l => l._id === currentLabelId)} options={labels}
    />
  </div>
  );

const LabelSelect = withTheme(Styles, Component);

LabelSelect.propTypes = {
};

LabelSelect.defaultProps = {
};

LabelSelect.displayName = 'LabelSelect';
Component.displayName = 'withTheme(LabelSelect)';
export default LabelSelect;
