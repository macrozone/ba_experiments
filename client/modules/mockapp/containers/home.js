import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import Home from '../components/home.jsx';
import {withState} from 'recompose';
import _ from 'lodash';
export const composer = ({context}, onData) => {
  const {LocalState, LocalCollections: {Lines}} = context();
//  const drawingPoints = _.chain(DrawingPoints.find().fetch()).map(({x,y}) => [ x,y ]).flatten()
//  .value();
  const currentLineId = LocalState.get('mockapp.currentLineId');
  const lines = Lines.find().fetch();
  onData(null, {currentLineId, lines});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  draw: actions.mockapp.draw,
  startNewLine: actions.mockapp.startNewLine,
  stopCurrentLine: actions.mockapp.stopCurrentLine
});

export default composeAll(
  composeWithTracker(composer),
  withState('isDrawing', 'setDrawing', false),
  useDeps(depsMapper)
)(Home);
