import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
import mockappModule from './modules/mockapp';
import annotationsModule from './modules/annotations';
import segmentationModule from './modules/segmentation';

// init context
const context = initContext();

// create app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(mockappModule);
app.loadModule(annotationsModule);
app.loadModule(segmentationModule);
app.init();
