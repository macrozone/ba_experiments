import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';
import AnnotationTools3D from '../components/annotation_tools_3_d.jsx';

export const composer = ({ context }, onData) => {
  const { Meteor, Collections, LocalState } = context();

  const currentAnnotationTool = LocalState.get('pet_3d_viewer.currentAnnotationTool');
  onData(null, { currentAnnotationTool });
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(AnnotationTools3D);
