import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Annotations from '../annotations';


storiesOf('annotations.Annotations', module)
  .addWithInfo('default view', 'This is the default view', () => {
    return (
      <Annotations />
    );
  })
