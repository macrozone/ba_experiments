import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import Draw from '../components/draw.jsx';
import withMousePosition from '../../core/hocs/with_mouse_position';

export const composer = ({context}, onData) => {
  const {LocalState} = context();
  const showAnnotations = LocalState.get('annotations.showAnnotations');
  const image = LocalState.get('mockapp.currentImage');
  const currentToolId = LocalState.get('annotations.currentToolId');
  onData(null, {image, showAnnotations, currentToolId});
};

export const keyComposer = ({context}, onData) => {
  const {Keypress} = context();
  const altKey = Keypress.is(Keypress.Keys.Alt);
  onData(null, {altKey});
};

export const depsMapper = (context, actions) => ({
  drawPolygon: actions.annotations.drawPolygon,
  context: () => context,
});
export default composeAll(
  withMousePosition(),
  composeWithTracker(keyComposer),
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Draw);
