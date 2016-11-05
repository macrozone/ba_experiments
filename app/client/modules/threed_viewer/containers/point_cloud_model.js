import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import PointCloudModel from '../components/point_cloud_model.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, LocalState} = context();
  const opacity = LocalState.get('pet_3_d_viewer.opacity');
  const minSuv = LocalState.get('pet_3_d_viewer.min_suv');
  const maxSuv = LocalState.get('pet_3_d_viewer.max_suv');
  const pointSize = LocalState.get('pet_3_d_viewer.point_size');

  onData(null, {opacity, minSuv, maxSuv, pointSize});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(PointCloudModel);
