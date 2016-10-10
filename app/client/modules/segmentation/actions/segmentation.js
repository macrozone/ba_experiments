export default {
  setOpacity({LocalState}, opacity) {
    LocalState.set('segmentation.opacity', opacity);
  },
  setRegionSize({LocalState}, size) {
    LocalState.set('segmentation.regionSize', size);
  }
};
