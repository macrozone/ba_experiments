import React from 'react';

import { Image } from 'react-konva';
const SegmentationImage = ({segmentation: { canvas }, segmentationOpacity, toggleAnnotation}) => {

  return (
    <Image
      opacity={segmentationOpacity}
      image={canvas}
      onClick={({evt: {x,y}}) => toggleAnnotation(x,y)}
      />
  );
};

SegmentationImage.propTypes = {
};

SegmentationImage.defaultProps = {
};

SegmentationImage.displayName = 'SegmentationImage';
export default SegmentationImage;
