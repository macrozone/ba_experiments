import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Polygon from '../polygon';


storiesOf('annotations.Polygon', module)
  .addWithInfo('default view', 'This is the default view', () => {
    return (
      <Polygon />
    );
  })
