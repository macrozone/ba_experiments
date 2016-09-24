/* eslint-disable react/display-name */

import React from 'react';
import Radium from 'radium';


export const injectStyles = (C, Styles, options = {}) => {
  const { radium = true, radiumState = null } = options;
  if (radium && radiumState) {
    return Radium(class extends React.Component {
      render() {
        const props = {
          ...this.props,
          styles: Styles.call(this, this.props, this.context.context.theme),
        };
        return C.call(this, props);
      }
    });
  }
  let Component = C;
  if (radium) {
    Component = Radium(C);
  }

  return (props, { context }) => {
    const styles = Styles(props, context.theme);
    return <Component {...props} styles={styles} />;
  };
};


export default (Styles, C, options = {}) => {
  const CWithStyles = injectStyles(C, Styles, options);
  CWithStyles.contextTypes = {
    // receive mantra context, so that we can ommit depsMapper (just to make the react-tree smaller)
    context: React.PropTypes.object,
  };
  return CWithStyles;
};
