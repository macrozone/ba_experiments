import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Plot from '../plot';


storiesOf('core.Plot', module)
  .addWithInfo('default view', 'This is the default view', () => {
    return (
      <Plot />
    );
  })
