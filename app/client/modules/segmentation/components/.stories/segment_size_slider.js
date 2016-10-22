import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import RegionSizeSlider from '../region_size_slider';


storiesOf('segmentation.RegionSizeSlider', module)
  .addWithInfo('default view', 'This is the default view', () => {
    return (
      <RegionSizeSlider />
    );
  })
