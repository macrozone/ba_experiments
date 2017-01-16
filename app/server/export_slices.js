
import Annotations from '/lib/collections/annotations';
import Cases from '/lib/collections/cases';
import gd from 'node-gd';
import _ from 'lodash';
import fs from 'fs';

const pointIsInSphere = ({ point, sphere }) => {
  const { x, y, z } = point;
  const { x: cx, y: cy, z: cz } = sphere.position;
  const r = sphere.radius;
  //  console.log(Math.pow(x - cx, 2) + Math.pow(y - cy, 2) + Math.pow(z - cz, 2));


  return Math.pow(x - cx, 2) + Math.pow(y - cy, 2) + Math.pow(z - cz, 2) < Math.pow(r, 2);
};

export const exportCase = (caseId, labelId) => {
  const { assetPath } = Meteor.settings;
  const path = `${assetPath}/exports/${caseId}/`;
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
  // we create a set of images for every slice
  const theCase = Cases.findOne(caseId);
  const { width, height, depth } = theCase;
  // we only take one label currently
  const annotations = Annotations.find({ labelId, caseId, type: 'sphere_3d' }).fetch();
  const labelColor = gd.trueColor(255, 255, 255); // white for test

  for (let y = 0; y < depth; y++) {
    const sliceImage = gd.createTrueColorSync(width, height);

    sliceImage.colorAllocate(0, 0, 0);
    for (let z = 0; z < height; z++) {
      for (let x = 0; x < width; x++) {
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
      }
    }
    const number = _.padStart(y, 4, '0');
    // console.log('writing slices', y);
    sliceImage.saveJpeg(`${path}/labelslice_${number}.jpg`, 100, function (error) {
      sliceImage.destroy();
      if (error) throw error;
    });
  }
};


export const exportAllCases = () => {
  Cases.find({ type: 'pet' }).forEach((aCase) => {
    exportCase(aCase._id, 'PRtafRzrete8spaWm');
  });
};
