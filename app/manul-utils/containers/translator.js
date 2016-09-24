import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';
import React from 'react';
export const depsMapper = (context, actions) => ({
  context: () => context,
  T: context.i18n.T,
});

export default composeAll(
  useDeps(depsMapper)
)(({ T, ...props }) => <T {...props} />);
