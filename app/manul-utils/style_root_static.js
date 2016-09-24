import React from 'react';
import { StyleRoot as RadiumStyleRoot } from 'radium';
/**
  use this StyleRoot if you arent inside a mantra-app, e.g. in storybook or server emails
**/
const StyleRoot = class extends React.Component {
  getChildContext() {
    const { theme } = this.props;
    return {
      context: { theme }, // inject theme as mantra context
    };
  }
  render() {
    return <RadiumStyleRoot {...this.props} />;
  }
};
StyleRoot.childContextTypes = {
  context: React.PropTypes.object,
};

StyleRoot.displayName = 'StyleRoot';


export default StyleRoot;
