import RandomColor from 'random-color';

export default {
  draw({LocalCollections: {Lines}}, lineId, x, y) {

    Lines.update(lineId, {$push: {points: {$each: [ x,y ]}}});
  },
  startNewLine({LocalCollections: {Lines}, LocalState}) {
    const lineId = Lines.insert({points: [], color: RandomColor().rgbString()});
    LocalState.set('mockapp.currentLineId', lineId);
  },
  stopCurrentLine({LocalState}) {
    LocalState.delete('mockapp.currentLineId');
  }
};
