import React from 'react';

import CaseSelect from '/client/modules/core/containers/case_select';

import SelectState from '/client/modules/core/containers/select_state';
import Slider from '/client/modules/core/containers/slider';
import withTheme from '/lib/with_theme';

import AnnotationPanel from '../containers/annotation_panel';
import CaseLabel from '../../core/containers/case_label';
import SelectAxis from '../containers/select_axis';
import ToggleAxesButton from '../containers/toggle_axes_button';

const Styles = ({ style, ...props }, theme) => ({
  base: [
    {
      color: 'black',
    },
    style, // allow override
  ],
  loading: {
    color: 'white',
  },
});

const Component = ({ styles, caseId, theCase, setCase }) => {
  if (!caseId) {
    return (
      <div style={styles.base}>
        <CaseSelect type="pet" onChange={setCase} />
      </div>
    );
  }

  if (!theCase) {
    return (
      <div style={styles.base}>
        <p style={styles.loading}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={styles.base}>
      <CaseSelect type="pet" caseId={caseId} onChange={setCase} />
      {caseId && <CaseLabel caseId={caseId} />}
      <AnnotationPanel caseId={caseId} />
      <ToggleAxesButton />
      <h2>PET settings</h2>
      <Slider
        label="minSuv"
        max={theCase.data.max || 0.01}
        min={theCase.data.min || 0.00001}
        step={(theCase.data.max - theCase.data.min) / 1000}
        localState="pet_3_d_viewer.min_suv"
        debounce={300}
      />
      <Slider
        label="maxSuv"
        max={theCase.data.max || 0.01}
        min={theCase.data.min || 0.00001}
        step={(theCase.data.max - theCase.data.min) / 1000}
        localState="pet_3_d_viewer.max_suv"
        debounce={300}
      />
      <Slider
        label="opacity"
        max={1}
        min={0.01}
        step={0.01}
        localState="pet_3_d_viewer.opacity"
        debounce={300}
      />

      <Slider
        label="Point size"
        max={2}
        min={0.01}
        step={0.1}
        localState="pet_3_d_viewer.point_size"
        debounce={300}
      />
      <SelectState
        label="Blending"
        localState="pet_3_d_viewer.blending"
        options={[
          { value: 'NoBlending', label: 'NoBlending' },
          { value: 'NormalBlending', label: 'NormalBlending' },
          { value: 'AdditiveBlending', label: 'AdditiveBlending' },
          { value: 'SubtractiveBlending', label: 'SubtractiveBlending' },
          { value: 'MultiplyBlending', label: 'MultiplyBlending' },
        ]}
      />
      <SelectAxis />

    </div>
  );
};

const Pet3DViewerPanel = withTheme(Styles, Component);

Pet3DViewerPanel.propTypes = {
};

Pet3DViewerPanel.defaultProps = {
};

Pet3DViewerPanel.displayName = 'Pet3DViewerPanel';
Component.displayName = 'withTheme(Pet3DViewerPanel)';
export default Pet3DViewerPanel;
