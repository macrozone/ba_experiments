import React from 'react';

import {Layer, Rect, Stage, Group} from 'react-konva';
const MyRect = () => (
  <Rect
      x={10} y={10} width={50} height={50}
      fill={"red"}
      shadowBlur={10}
      onClick={() => alert('click')}
  />
);
const Home = () => (
  <div>
    <Stage width={700} height={700}>
       <Layer>
           <MyRect/>
       </Layer>
     </Stage>
  </div>
);

export default Home;
