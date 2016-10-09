import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import SegmentationOpacitySlider from '../segmentation_opacity_slider';


storiesOf('annotations.SegmentationOpacitySlider', module)
  .addWithInfo('default view', 'This is the default view', () => {
    return (
      <SegmentationOpacitySlider />
    );
  })
