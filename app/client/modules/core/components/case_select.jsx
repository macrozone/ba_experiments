import React from 'react';
import withTheme from '/lib/with_theme';

const Styles = ({ style, ...props }, theme) => {
  return {
    base: [
      {
        fontSize: 20,
        marginBottom: 10,
      },
      style, // allow override
    ],
    label: {
      color: 'white',
    },
  };
};


const Component = ({ styles, selectCase, cases, caseId }) => {
  return (
    <div style={styles.base}>
      <p style={styles.label}>Select a case</p>
      <select name="case-select" value={caseId} onChange={event => selectCase(event.target.value)}>
        <option value={''}>(please select)</option>
        {
          cases.map(aCase => (
            <option key={aCase._id} value={aCase._id}>{aCase.title}</option>
          ))
        }
      </select>
    </div>
  );
};

const CaseSelect = withTheme(Styles, Component);

CaseSelect.propTypes = {
};

CaseSelect.defaultProps = {
};

CaseSelect.displayName = 'CaseSelect';
Component.displayName = 'withTheme(CaseSelect)';
export default CaseSelect;
