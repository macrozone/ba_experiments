import { configure, setAddon, addDecorator } from '@kadira/storybook';
import { disable } from 'react-komposer';

disable();

function loadStories() {
  require('../client/modules/threed_viewer/components/.stories/index.js');
  require('../client/modules/segmentation/components/.stories/index.js');
  require('../client/modules/annotations/components/.stories/index.js');
  require('../client/modules/mockapp/components/.stories/index.js');
  require('../client/modules/core/components/.stories/index.js');
  // require as many as stories you need.
}

configure(loadStories, module);
