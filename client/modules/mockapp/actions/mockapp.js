import RandomColor from 'random-color';
import faker from 'faker';
export default {
  draw({LocalCollections: {Rois}}, roiId, x, y) {

    Rois.update(roiId, {$push: {points: {$each: [ x,y ]}}});
  },
  startNewRoi({LocalCollections: {Rois}, LocalState}) {
    const roiId = Rois.insert({points: [], color: RandomColor().rgbString()});
    LocalState.set('mockapp.currentRoiId', roiId);
    LocalState.set('mockapp.showRois', true);
  },
  stopCurrentRoi({LocalState}) {
    LocalState.delete('mockapp.currentRoiId');
  },
  toggleRois({LocalState}) {
    const showRois = LocalState.get('mockapp.showRois');
    LocalState.set('mockapp.showRois', !showRois);
  },
  deleteRoi({LocalState, LocalCollections: {Rois}}, roiId) {
    Rois.remove(roiId);
  },
  nextSample({LocalState, LocalCollections: {Rois}}) {
    Rois.remove({});
    LocalState.set('mockapp.currentImage', faker.random.image());
    LocalState.set('samplesDone', (LocalState.get('samplesDone') || 0) + 1);
  },
  setCTSample({LocalState, LocalCollections: {Rois}}) {
    Rois.remove({});
    LocalState.set('samplesDone', (LocalState.get('samplesDone') || 0) + 1);
    LocalState.set(
      'mockapp.currentImage',
      'https://www.radiologie-leipzig.de/files/images/content/computertomographie/11_ct-abdomen.jpg'
    );

  }
};
