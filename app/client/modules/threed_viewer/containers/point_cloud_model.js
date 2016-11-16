import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import PointCloudModel from '../components/point_cloud_model.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, LocalState, Schemas} = context();

  const petOptions = Schemas.PetOptions.clean(
    LocalState.get('threed_viewer.petOptions') || {}
  );

  onData(null, {petOptions});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(PointCloudModel);
