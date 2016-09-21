import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Draw from '../draw';


storiesOf('mockapp.Draw', module)
  .addWithInfo('default view', 'This is the default view', () => {
    return (
      <Draw />
    );
  });
