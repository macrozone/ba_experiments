import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Options from '../options';


storiesOf('segmentation.Options', module)
  .addWithInfo('default view', 'This is the default view', () => {
    return (
      <Options />
    );
  })
