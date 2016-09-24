import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import Draw from '../components/draw.jsx';
import {withState} from 'recompose';
import _ from 'lodash';
export const composer = ({context}, onData) => {
  const {LocalState, LocalCollections: {Rois}} = context();
//  const drawingPoints = _.chain(DrawingPoints.find().fetch()).map(({x,y}) => [ x,y ]).flatten()
//  .value();
  const currentRoiId = LocalState.get('mockapp.currentRoiId');
  const rois = Rois.find().fetch();
  const showRois = LocalState.get('mockapp.showRois');
  const image = LocalState.get('mockapp.currentImage');

  onData(null, {image, showRois, currentRoiId, rois});
};

export const keyComposer = ({context}, onData) => {
  const {Keypress} = context();
  const altKey = Keypress.is(Keypress.Keys.Alt);
  onData(null, {altKey});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  draw: _.throttle(actions.mockapp.draw, 16),
  startNewRoi: actions.mockapp.startNewRoi,
  deleteRoi: actions.mockapp.deleteRoi,
  stopCurrentRoi: actions.mockapp.stopCurrentRoi
});
export default composeAll(
  composeWithTracker(keyComposer),
  composeWithTracker(composer),
  withState('isDrawing', 'setDrawing', false),
  useDeps(depsMapper)
)(Draw);
