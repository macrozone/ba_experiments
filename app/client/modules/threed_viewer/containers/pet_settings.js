import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import PetSettings from '../components/pet_settings.jsx';

export const composer = ({context, schema}, onData) => {
  const {LocalState} = context();
  const petOptions = schema.clean(
    LocalState.get('threed_viewer.petOptions') || {}
  );
  onData(null, {schema, petOptions});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  schema: context.Schemas.PetOptions,
  setPetOptions: actions.threedViewer.setPetOptions
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(PetSettings);
