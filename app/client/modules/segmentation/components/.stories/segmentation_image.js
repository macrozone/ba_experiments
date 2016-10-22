import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import SegmentationImage from '../segmentation_image';


storiesOf('segmentation.SegmentationImage', module)
  .addWithInfo('default view', 'This is the default view', () => {
    return (
      <SegmentationImage />
    );
  })
