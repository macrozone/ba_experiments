import React from 'react';
import withTheme from '/manul-utils/with_theme';

import SelectAxis from '../containers/select_axis';
import ToggleAxesButton from '../containers/toggle_axes_button';
import CaseSelect from '/client/modules/core/containers/case_select';
import PetSettings from '../containers/pet_settings';
import {Tabs, Tab} from 'react-bootstrap';

const Styles = ({style, ...props}, theme) => {
  return {
    base: [
      {
        color: 'black'
      },
      style // allow override
    ]
  };
};

const Component = ({styles, caseId, setCase}) => {
  return (
    <div style={styles.base}>
      <CaseSelect caseId={caseId} onChange={setCase}/>
        <Tabs>
          <Tab eventKey={1} title="PET"><PetSettings /></Tab>
          <Tab eventKey={2} title="CT"><h1>CT settings..</h1></Tab>
        </Tabs>
      <SelectAxis />
      <ToggleAxesButton />
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
