import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';
import Toolbar from '../components/toolbar.jsx';

export const composer = ({ context }, onData) => {
  const { Meteor, LocalState } = context();
  const currentToolId = LocalState.get('annotations.currentToolId');
  const tools = [
    { _id: 'polygon2d', label: 'Polygon' },
    { _id: 'circle2d', label: 'Circle' },
    { _id: 'superpixels2d', label: 'Super Pixels' },
  ];
  onData(null, { tools, currentToolId });
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  activateTool: actions.annotations.activateTool,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Toolbar);
