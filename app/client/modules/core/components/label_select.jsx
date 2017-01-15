import React from 'react';
import withTheme from '/lib/with_theme';
import Select from 'react-select';

const Styles = ({ style, ...props }, theme) => ({
  base: [
    {

    },
    style, // allow override
  ],
});

const optionRenderer = label => (
  <span>
    <span
      style={{
        display: 'inline-block',
        backgroundColor: label.color,
        width: 16,
        height: 16,
        marginRight: 8,
        borderRadius: '50%',
      }}
    />
    {label.name}
  </span>
);

const Component = ({ styles, labels, onChange, labelId }) => (
  <div style={styles.base} name="label-select">
    <Select

      onChange={(label) => {
        onChange(label && label._id);
      }}
      optionRenderer={optionRenderer}
      valueRenderer={optionRenderer}
      value={labels.find(l => l._id === labelId)} options={labels}
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
