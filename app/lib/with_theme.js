/* eslint-disable react/display-name */

import React from 'react';
import Radium from 'radium';

/**

withTheme injects styles into your component
which can be calculated from props and a global theme.
As convenience, it also wraps your component with Radium.

usage:

const Component = ({styles, title, text}) => (
  <div style={styles.base}>
    <h1 style={styles.title}>{title}</h1>
    <p style={styles.text}>{text}</p>
  </div>
);

const Styles = ({highlight = false}, theme) => ({
  base: [{
     padding: 20,
     border: `1px solid ${theme.colors.primary}`
  }, style],
  title: {
    ...theme.fonts.title,
    color: highlight ? theme.colors.highlight : "black"
  },
  text: {
    ...theme.fonts.text,
    marginTop: 10
  }
});

const ComponentWithStyles = withTheme(Styles, Component);

<ComponentWithStyles title="..." text="..." highlight />
*/

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
