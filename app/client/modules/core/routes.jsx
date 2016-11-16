import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/components/main_layout.jsx';
import Plot from './containers/plot';
import MockAppHome from '/client/modules/mockapp/containers/home';
import Home from '/client/modules/core/containers/home';
export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/', {
    name: 'home',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Home />)
      });
    }
  });

  FlowRouter.route('/kmeans', {
    name: 'kmeans',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Plot />)
      });
    }
  });

  FlowRouter.route('/annotation2d', {
    name: 'annotation2d',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<MockAppHome />)
      });
    }
  });
}
