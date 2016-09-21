import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Panel from '../panel';


storiesOf('mockapp.Panel', module)
  .addWithInfo('default view', 'This is the default view', () => {
    return (
      <Panel />
    );
  })
