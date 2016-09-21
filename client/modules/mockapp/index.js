import actions from './actions';
import routes from './routes.jsx';

export default {
  routes,
  actions,
  load({LocalState}, actions) {
    actions.mockapp.nextSample();
    LocalState.set('samplesDone', 0);

  }
};
