import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import Draw from '../components/draw.jsx';
import {withState} from 'recompose';
import withMousePosition from '../../core/hocs/with_mouse_position';
import _ from 'lodash';
export const composer = ({context}, onData) => {
  const {LocalState, Collections: {Annotations}} = context();
//  const drawingPoints = _.chain(DrawingPoints.find().fetch()).map(({x,y}) => [ x,y ]).flatten()
//  .value();
  const currentAnnotationId = LocalState.get('mockapp.currentAnnotationId');
  const annotations = Annotations.find().fetch();
  const showAnnotations = LocalState.get('mockapp.showAnnotations');
  const image = LocalState.get('mockapp.currentImage');

  onData(null, {image, showAnnotations, currentAnnotationId, annotations});
};

export const keyComposer = ({context}, onData) => {
  const {Keypress} = context();
  const altKey = Keypress.is(Keypress.Keys.Alt);
  onData(null, {altKey});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  draw: _.throttle(actions.mockapp.draw, 16),
  startNewAnnotation: actions.mockapp.startNewAnnotation,
  deleteAnnotation: actions.mockapp.deleteAnnotation,
  stopCurrentAnnotation: actions.mockapp.stopCurrentAnnotation
});
export default composeAll(
  withMousePosition(),
  composeWithTracker(keyComposer),
  composeWithTracker(composer),
  withState('isDrawing', 'setDrawing', false),
  useDeps(depsMapper)
)(Draw);
