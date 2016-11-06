import _ from 'lodash';

export default ({currentEditingAnnotation, createAnnotation, updateAnnotation}) => {
  const drawPolygon = (x,y) => {
    if (!currentEditingAnnotation) {
      createAnnotation('polygon', {points: [ x,y ]});
    } else {
      updateAnnotation(currentEditingAnnotation._id, {$push: {'props.points': {$each: [ x,y ]}}});
    }
  };
  return {
    onClick: ({evt}) => drawPolygon(evt.x, evt.y),
    onMousemove: _.throttle(
      e => e.evt.which ? drawPolygon(e.evt.x, e.evt.y) : null
    , 60)
  };
};
