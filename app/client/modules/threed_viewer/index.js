import actions from './actions';
import routes from './routes.jsx';

export default {
  routes,
  actions,
  load({LocalState}) {
    LocalState.set('pet_3_d_viewer.opacity', 0.3);
  }
};
