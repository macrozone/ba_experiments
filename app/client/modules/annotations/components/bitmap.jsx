import React from 'react';
import {Image} from 'react-konva';
import Color from 'color';

import { onlyUpdateForKeys} from 'recompose';

const Bitmap = onlyUpdateForKeys([ 'loaded', 'image' ])(({loaded, image, onClick}) => {
  // console.log('render image', image);
  const cache = node => {
    console.log('cache', node);
    // node.cache();
    // node.drawHitFromCache();

  };
  return (
    <Image
      ref={node => node && loaded && cache(node)}
      image={loaded ? image : null}
      onClick={onClick}
      />
    );
});


Bitmap.propTypes = {
};

Bitmap.defaultProps = {
};

Bitmap.displayName = 'Bitmap';
export default Bitmap;
