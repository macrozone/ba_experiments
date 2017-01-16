
import Annotations from '/lib/collections/annotations';
import Cases from '/lib/collections/cases';
import gd from 'node-gd';
import _ from 'lodash';
import fs from 'fs';


import { bufferToArray } from './buffer_utils';

const pointIsInSphere = ({ point, sphere }) => {
  const { x, y, z } = point;
  const { x: cx, y: cy, z: cz } = sphere.position;
  const r = sphere.radius;
  //  console.log(Math.pow(x - cx, 2) + Math.pow(y - cy, 2) + Math.pow(z - cz, 2));


  return Math.pow(x - cx, 2) + Math.pow(y - cy, 2) + Math.pow(z - cz, 2) < Math.pow(r, 2);
};

export const exportCase = (caseId, labelId) => {
  const { assetPath } = Meteor.settings;
  const theCase = Cases.findOne(caseId);
  const casePath = `${assetPath}/exports/${theCase.title}/`;
  if (!fs.existsSync(casePath)) {
    fs.mkdirSync(casePath);
  }

  const path = `${assetPath}/exports/${theCase.title}/slices`;
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
  // we create a set of images for every slice

  const { width, height, depth } = theCase;
  // we only take one label currently
  const annotations = Annotations.find({ labelId, caseId, type: 'sphere_3d' }).fetch();
  const labelColor = gd.trueColor(1, 0, 0); // for python notebook

  // export also the ground truth

  const groundTruthCase = Cases.findOne({ title: theCase.title, type: 'lab' });
  let groundTruthArray = null;
  if (groundTruthCase) {
    const file = `${assetPath}/${groundTruthCase.data.file}`;
    const buffer = fs.readFileSync(file);
    groundTruthArray = bufferToArray(buffer);
    console.log('has ground truth: ', file);
  }
  // as well as the pet as slices
  const petFile = `${assetPath}/${theCase.data.file}`;
  const buffer = fs.readFileSync(petFile);
  const petArray = bufferToArray(buffer);

  let index = 0;
  for (let y = 0; y < depth; y++) {
    const sliceImage = gd.createTrueColorSync(width, height);
    const petImage = gd.createTrueColorSync(width, height);
    let grouthTruthImage = null;
    if (groundTruthCase) {
      grouthTruthImage = gd.createTrueColorSync(width, height);
    }
    for (let z = 0; z < height; z++) {
      for (let x = 0; x < width; x++) {
        index++;

        const point = { x: x - (width / 2), y: y - (depth / 2), z: z - (height / 2) };

          // check if point is inside any annotation for this caseId
        for (const annotation of annotations) {
          const { position, radius } = annotation.props;
          const sphere = { position, radius };
          const isInSphere = pointIsInSphere({ point, sphere });

          if (isInSphere) {
            sliceImage.setPixel(x, z, labelColor);
          }
        }


        // write also grondturthslice
        if (groundTruthArray) {
          if (groundTruthArray[index]) {
            grouthTruthImage.setPixel(x, z, labelColor);
          }
        }
        // we need optionally some pet data for the notebook, we create some simple data
        if (petArray[index] > 5.0) {
          // todo: create nice color
          petImage.setPixel(x, z, labelColor);
        }
      }
    }
    const number = _.padStart(y, 4, '0');
    // console.log('writing slices', y);
    sliceImage.savePng(`${path}/manslice_${number}.png`, 0, function (error) {
      sliceImage.destroy();
      if (error) throw error;
    });
    petImage.savePng(`${path}/petslice_${number}.png`, 0, function (error) {
      petImage.destroy();
      if (error) throw error;
    });
    if (grouthTruthImage) {
      grouthTruthImage.savePng(`${path}/labelslice_${number}.png`, 0, function (error) {
        grouthTruthImage.destroy();
        if (error) throw error;
      });
    }
  }
};


export const exportAllCases = () => {
  Cases.find({ type: 'pet' }).forEach((aCase) => {
    exportCase(aCase._id, 'PRtafRzrete8spaWm');
  });
};
