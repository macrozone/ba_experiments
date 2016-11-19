import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';
import Annotations from '../components/annotations.jsx';
import PolygonToolEvents from '../libs/polygon_tool_events';
import CircleToolEvents from '../libs/circle_tool_events';
import SuperpixelsToolEvents from '../libs/superpixels_tool_events';

export const composer = ({ context, segmentation, createAnnotation, updateAnnotation, stopEditingCurrentAnnotation }, onData) => {
  const { LocalState, Collections } = context();

  const currentEditingAnnotationId = LocalState.get('annotations.currentEditingAnnotationId');
  const annotations = Collections.Annotations.find({ caseId: '2d-sample-app' }).fetch();
  const currentEditingAnnotation = Collections.Annotations.findOne(currentEditingAnnotationId);
  const currentToolId = LocalState.get('annotations.currentToolId');

  const toolEventContext = {
    context,
    currentEditingAnnotation,
    stopEditingCurrentAnnotation,
    createAnnotation,
    updateAnnotation,
    segmentation,
    caseId: '2d-sample-app',
  };
  const toolEventMap = {
    polygon2d: PolygonToolEvents(toolEventContext),
    circle2d: CircleToolEvents(toolEventContext),
    superpixels2d: SuperpixelsToolEvents(toolEventContext),
  };

  const toolEvents = toolEventMap[currentToolId];

  onData(null, { toolEvents, currentToolId, currentEditingAnnotation, annotations });
};

export const addLabels = ({ context, annotations }, onData) => {
  const { Collections: { Labels } } = context();

  onData(null, { annotations: annotations.map(
    annotation => ({ ...annotation, label: Labels.findOne(annotation.labelId) })
  ) });
};

export const keyComposer = ({ context }, onData) => {
  const { Keypress } = context();
  const altKey = Keypress.is(Keypress.Keys.Alt);
  onData(null, { altKey });
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  createAnnotation: actions.annotations.createAnnotation,
  updateAnnotation: actions.annotations.updateAnnotation,
  deleteAnnotation: actions.annotations.deleteAnnotation,
  stopEditingCurrentAnnotation: actions.annotations.stopEditingCurrentAnnotation,
});
export default composeAll(
  composeWithTracker(addLabels),
  composeWithTracker(composer),
  composeWithTracker(keyComposer),
  useDeps(depsMapper)
)(Annotations);
