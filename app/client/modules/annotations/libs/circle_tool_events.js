
import { distance } from '../libs/utilities';

export default (
    { caseId, currentEditingAnnotation, createAnnotation, updateAnnotation, stopEditingCurrentAnnotation }
  ) => {
  const drawCircle = (x, y) => {
    if (!currentEditingAnnotation) {
      createAnnotation(
        { caseId, type: 'circle2d', props: { point: { x, y }, radius: 50 } }
      );
    } else {
      const radius = distance(currentEditingAnnotation.props.point, { x, y });
      updateAnnotation(currentEditingAnnotation._id, { $set: { 'props.radius': radius } });
      stopEditingCurrentAnnotation();
    }
  };

  return {
    onClick: ({ evt }) => drawCircle(evt.x, evt.y),
  };
};
