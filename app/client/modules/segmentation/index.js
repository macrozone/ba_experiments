import actions from './actions';
import routes from './routes.jsx';

export default {
  routes,
  actions,
  load({LocalState}) {
    LocalState.set('segmentation.opacity', 0.5);
    LocalState.set('segmentation.regionSize', 15);
  }
};
