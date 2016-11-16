import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import 'uniforms-bootstrap3';

export default new SimpleSchema({
  opacity: {
    type: Number,
    decimal: true,
    defaultValue: 1,
    min: 0.01,
    max: 1
  },
  minSuv: {
    type: Number,
    decimal: true,
    min: 0.00001,
    defaultValue: 0.0001,
    max: 0.01,
    uniforms: {
      sliderStep: 0.00001
    }
  },
  maxSuv: {
    type: Number,
    decimal: true,
    min: 0.00001,
    defaultValue: 0.0025,
    max: 0.01,
    uniforms: {
      sliderStep: 0.00001
    }
  },
  pointSize: {
    type: Number,
    decimal: true,
    min: 0.01,
    defaultValue: 1,
    max: 2,
    uniforms: {
      sliderStep: 0.01
    }
  },
  blending: {
    type: String,
    defaultValue: 'NormalBlending',
    allowedValues: [
      'NoBlending', 'NormalBlending', 'AdditiveBlending', 'SubtractiveBlending', 'MultiplyBlending'
    ]
  }
});
