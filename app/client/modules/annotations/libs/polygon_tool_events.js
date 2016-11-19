import _ from 'lodash';

export default ({ caseId, currentEditingAnnotation, createAnnotation, updateAnnotation }) => {
  const drawPolygon = (x, y) => {
    if (!currentEditingAnnotation) {
      createAnnotation({ caseId, type: 'polygon2d', props: { points: [x, y] } });
    } else {
      updateAnnotation(currentEditingAnnotation._id, { $push: { 'props.points': { $each: [x, y] } } });
    }
  };
  return {
    onClick: ({ evt }) => drawPolygon(evt.x, evt.y),
    onMousemove: _.throttle(
      e => e.evt.which ? drawPolygon(e.evt.x, e.evt.y) : null
    , 60),
  };
};
