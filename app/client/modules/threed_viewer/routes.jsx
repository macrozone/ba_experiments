import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/components/main_layout.jsx';

import Pet3dViewer from './containers/pet_3_d_viewer';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);
  FlowRouter.route('/pet3dviewer', {
    name: 'pet3dviewer',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Pet3dViewer />)
      });
    }
  });
}
