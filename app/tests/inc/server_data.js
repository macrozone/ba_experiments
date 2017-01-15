

export const getCasesCountOnServer = () => {
  const Cases = require('/lib/collections/cases').default;
  return Cases.find({ type: 'pet' }).count();
};

export const getFirstCaseOnServer = () => {
  const Cases = require('/lib/collections/cases').default;
  return Cases.findOne({ type: 'pet' }, { sort: { title: 1 } });
};

export const getSampleCaseOnServer = () => {
  const Cases = require('/lib/collections/cases').default;
  return Cases.findOne({ title: 'STS_012', type: 'pet' });
};


export const getAnnotationsOnServer = (caseId) => {
  const Annotations = require('/lib/collections/annotations').default;
  return Annotations.find({ caseId }).fetch();
};

export const getAllLabelsOnServer = () => {
  const Labels = require('/lib/collections/labels').default;
  return Labels.find({}, { sort: { position: 1 } }).fetch();
};

export const clearAnnotationsOnServer = () => {
  const Annotations = require('/lib/collections/annotations').default;
  Annotations.remove({});
};

export const createSampleAnnotation = (caseId, labelId) => {
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
