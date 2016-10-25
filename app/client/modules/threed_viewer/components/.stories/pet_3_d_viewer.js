import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Pet3DViewer from '../pet_3_d_viewer';


storiesOf('threed_viewer.Pet3DViewer', module)
  .addWithInfo('default view', 'This is the default view', () => {
    return (
      <Pet3DViewer />
    );
  })
