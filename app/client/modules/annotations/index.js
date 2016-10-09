import actions from './actions';
import routes from './routes.jsx';

export default {
  routes,
  actions,
  load({LocalState}) {
    LocalState.set('annotations.segmentationOpacity', 0.5);
    LocalState.set('annotations.showAnnotations', true);
  }
};
