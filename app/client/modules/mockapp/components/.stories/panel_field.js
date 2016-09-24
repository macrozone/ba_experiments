import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import PanelField from '../panel_field';


storiesOf('mockapp.PanelField', module)
  .addWithInfo('default view', 'This is the default view', () => {
    return (
      <PanelField />
    );
  })
