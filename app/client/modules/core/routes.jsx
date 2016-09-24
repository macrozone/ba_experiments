import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/components/main_layout.jsx';
import Plot from './containers/plot';
import Home from '/client/modules/mockapp/containers/home';
export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/kmeans', {
    name: 'kmeans',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Plot />)
      });
    }
  });

  FlowRouter.route('/', {
    name: 'appmock',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Home />)
      });
    }
  });
}
