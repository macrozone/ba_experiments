import React from 'react';
import withTheme from '/manul-utils/with_theme';
import Slider from '/client/modules/core/containers/slider';
import SelectState from '/client/modules/core/containers/select_state';
import {AutoForm} from 'uniforms-bootstrap3';

const Styles = ({style, ...props}, theme) => {
  return {
    base: [
      {

      },
      style // allow override
    ]
  };
};

const Component = ({styles, schema, petOptions, setPetOptions}) => {
  return (
    <div style={styles.base}>
      <AutoForm schema={schema} mode={petOptions} onSubmit={setPetOptions} />
    </div>
  );
};

const PetSettings = withTheme(Styles, Component);

PetSettings.propTypes = {
};

PetSettings.defaultProps = {
};

PetSettings.displayName = 'PetSettings';
Component.displayName = 'withTheme(PetSettings)';
export default PetSettings;
