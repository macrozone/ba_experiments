import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import OpacitySlider from '../opacity_slider';


storiesOf('annotations.OpacitySlider', module)
  .addWithInfo('default view', 'This is the default view', () => {
    return (
      <OpacitySlider />
    );
  })
