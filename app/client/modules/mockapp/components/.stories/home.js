import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Home from '../home';


storiesOf('mockapp.Home', module)
  .addWithInfo('default view', 'This is the default view', () => {
    return (
      <Home />
    );
  })
