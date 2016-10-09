
import faker from 'faker';
export default {

  nextSample({LocalState, Collections: {Annotations}}) {
    LocalState.set('mockapp.currentImage', faker.random.image());
    LocalState.set('samplesDone', (LocalState.get('samplesDone') || 0) + 1);
  },
  setCTSample({LocalState, Collections: {Annotations}}) {
    LocalState.set('samplesDone', (LocalState.get('samplesDone') || 0) + 1);
    LocalState.set(
      'mockapp.currentImage',
      'https://www.radiologie-leipzig.de/files/images/content/computertomographie/11_ct-abdomen.jpg'
    );

  }
};
