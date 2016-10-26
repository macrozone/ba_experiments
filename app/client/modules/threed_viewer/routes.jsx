import React from 'react';
import {mount} from 'react-mounter';

import AppLayout from '/client/modules/core/components/app_layout.jsx';

import Pet3dViewer from './containers/pet_3_d_viewer';
import Pet3dViewerPanel from './containers/pet_3_d_viewer_panel';

export default function (injectDeps, {FlowRouter}) {
  const AppLayoutCtx = injectDeps(AppLayout);
  FlowRouter.route('/pet3dviewer', {
    name: 'pet3dviewer',
    action() {
      mount(AppLayoutCtx, {
        main: () => (<Pet3dViewer />),
        panel: () => (<Pet3dViewerPanel />)
      });
    }
  });
}
