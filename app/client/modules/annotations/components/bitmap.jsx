import React from 'react';
import {Image} from 'react-konva';
import Color from 'color';


const Bitmap = ({isCurrent, isSelected, color, image, onClick, draggable}) => {
  return (
    <Image image={image} onClick={(e) => {

    }}/>
    );
};


Bitmap.propTypes = {
};

Bitmap.defaultProps = {
};

Bitmap.displayName = 'Bitmap';
export default Bitmap;
