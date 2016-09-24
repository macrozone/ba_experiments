import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import Plot from '../components/plot.jsx';
import _ from 'lodash';

const DELAY = 10;
const WIDTH = 500;
const HEIGHT = 500;
const POINTS = new Array(1000).fill(null).map(() => ({
  x: Math.random() * WIDTH,
  y: Math.random() * HEIGHT,
}));

const k = 3;

const distance = (a, b) => (
  Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2))
);


export const simulation = ({context, running}, onData) => {
  const {Meteor, Collections, LocalState} = context();
  const points = POINTS;



  const step1 = () => {
    // select k randomly
    const centers = _.sampleSize(points, k);
    centers.forEach((p, index) => {
      p.theClass = index;
    });
    Meteor.setTimeout(() => stepClassify(centers), DELAY);
    onData(null, {points, centers});
  };

  const stepClassify = (centers) => {
    points.forEach((p) => {
      const nextCenter = _.chain(centers).minBy((c) => distance(p,c)).value();
      p.theClass = nextCenter.theClass;
    });
    if (running) {
      Meteor.setTimeout(stepMeans, DELAY);
      onData(null, {centers, points: [ ...points ]});
    }

  };

  const stepMeans = () => {
    const clusters = _.chain(points).filter(b => b.theClass >= 0).groupBy('theClass').value();

    const newCenters = _.chain(clusters).mapValues((pointsInCluster, theClass) => ({
      theClass,
      x: _.chain(pointsInCluster).map('x').mean().value(),
      y: _.chain(pointsInCluster).map('y').mean().value()
    })).values().value();
    if (running) {
      Meteor.setTimeout(() => stepClassify(newCenters), DELAY);
    }

  };

  if (running) {
    Meteor.setTimeout(step1, DELAY);
  }
  onData(null, {points, centers: []});
};




export const composer = ({context}, onData) => {
  const {Meteor, Collections, LocalState} = context();
  const running = LocalState.get('running');
  const addPoint = (e) => {
    POINTS.push({x: e.clientX, y: e.clientY});
    console.log('adding point');
    onData(null, {addPoint, points: POINTS});
  };
  onData(null, {addPoint, running, points: POINTS});
};
export const depsMapper = (context, actions) => ({
  width: WIDTH,
  height: HEIGHT,
  toggleRunning: () => context.LocalState.set('running', !context.LocalState.get('running')),
  context: () => context,
});

export default composeAll(
  composeWithTracker(simulation),
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Plot);
