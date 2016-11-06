import actions from './actions';
import routes from './routes.jsx';

export default {
  routes,
  actions,
  load({LocalState}, actions) {
    actions.mockapp.setCTSample();
    LocalState.set('samplesDone', 0);

  }
};
