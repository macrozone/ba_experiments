import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Progress from '../progress';


storiesOf('mockapp.Progress', module)
  .addWithInfo('default view', 'This is the default view', () => {
    return (
      <Progress />
    );
  })
