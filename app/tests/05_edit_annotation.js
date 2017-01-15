/* eslint-env node, mocha */
/* eslint no-unused-expressions: 0*/
/* eslint global-require: 0*/
/* eslint import/newline-after-import: 0*/


import expectCanvas from './tools/expect_canvas';
import getImageFileForTest from './tools/get_image_file_for_test';
import waitForLoading from './tools/wait_for_loading';


const getSampleCaseOnServer = () => {
  const Cases = require('/lib/collections/cases').default;
  return Cases.findOne({ title: 'STS_012' });
};

const getAnnotationsOnServer = (caseId) => {
  const Annotations = require('/lib/collections/annotations').default;
  return Annotations.find({ caseId }).fetch();
};

const getLabelsOnServer = () => {
  const Labels = require('/lib/collections/labels').default;
  return Labels.find({}, { sort: { position: 1 } }).fetch();
};

const clearAnnotationsOnServer = () => {
  const Annotations = require('/lib/collections/annotations').default;
  Annotations.remove({});
};

const createAnnotation = (caseId, labelId) => {
  const Annotations = require('/lib/collections/annotations').default;

  const annotation = {
    caseId,
    labelId,
    type: 'sphere_3d',
    props: {
      type: 'sphere',
      ray: {
        origin: {
          x: -236.5274200439453,
          y: 47.49716567993164,
          z: 30.439735412597656,
        },
        direction: {
          x: 0.971904021290664,
          y: -0.198159706002219,
          z: -0.12702481771744817,
        },
      },
      position: {
        x: -1.0268827745169347,
        y: -0.5186015217538937,
        z: -0.3394487081601376,
      },
      radius: 56.745636191631604,
    },
  };
  Annotations.insert(annotation);
};


describe('Edit Annotations @watch', function () {
  beforeEach(function () {
    server.execute(clearAnnotationsOnServer);

    const { _id } = server.execute(getSampleCaseOnServer);
    const [firstLabel] = server.execute(getLabelsOnServer);
    server.execute(createAnnotation, _id, firstLabel._id);
    browser.setViewportSize({
      width: 800,
      height: 600,
    });
    browser.url(`http://localhost:3000/pet3dviewer/${_id}`);
    waitForLoading();
  });

  it('User can select and remove annotations', function () {

  });
});
