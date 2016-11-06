import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Toolbar from '../toolbar';


storiesOf('annotations.Toolbar', module)
  .addWithInfo('default view', 'This is the default view', () => {
    return (
      <Toolbar />
    );
  })
