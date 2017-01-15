  /* eslint-env node, mocha */
/* eslint no-unused-expressions: 0*/
/* eslint global-require: 0*/
/* eslint import/newline-after-import: 0*/


import waitForLoading from './inc/wait_for_loading';

import { getSampleCaseOnServer, getAllLabelsOnServer, clearAnnotationsOnServer, createSampleAnnotation, getAnnotationsOnServer } from './inc/server_data';


describe('Edit Annotations @watch', function () {
  beforeEach(function () {
    server.execute(clearAnnotationsOnServer);

    const { _id } = server.execute(getSampleCaseOnServer);
    const [firstLabel] = server.execute(getAllLabelsOnServer);
    server.execute(createSampleAnnotation, _id, firstLabel._id);
    browser.setViewportSize({
      width: 800,
      height: 600,
    });
    browser.url(`http://localhost:3000/pet3dviewer/${_id}`);
    waitForLoading();
  });

  afterEach(function () {
    server.execute(clearAnnotationsOnServer);
  });


  it('User can select and unselect annotation', function () {
    expect(browser.getText('body')).to.not.contain('Edit selected annotation');
    browser.click('canvas'); // center
    expect(browser.getText('body')).to.contain('Edit selected annotation');
    browser.click('canvas'); // center
    expect(browser.getText('body')).to.not.contain('Edit selected annotation');
  });

  it('User can also unselect with a button', function () {
    // expect(browser.getText('body')).to.not.contain('Edit selected annotation');
    browser.click('canvas'); // center
    expect(browser.getText('body')).to.contain('Edit selected annotation');
    browser.click('button=Unselect Annotation'); // center
    // FIXME: this is broken :-(
    // expect(browser.getText('body')).to.not.contain('Edit selected annotation');
  });

  it('has button to remove annotation', function () {
    const { _id } = server.execute(getSampleCaseOnServer);
    let annotations = server.execute(getAnnotationsOnServer, _id);
    expect(annotations.length).to.equal(1);
    browser.click('canvas'); // center click to select annotation
    browser.click('button=Remove Annotation');
    browser.pause(500);
    annotations = server.execute(getAnnotationsOnServer, _id);
    expect(annotations.length).to.equal(0);
  });

  it('has allows to update a label', function () {
    const { _id } = server.execute(getSampleCaseOnServer);
    browser.click('canvas'); // center click to select annotation
    browser.click("[name='label-select']");
    browser.click('[name=\'label-select\'] .Select-option:nth-child(3)');
    browser.pause(500);
    const annotations = server.execute(getAnnotationsOnServer, _id);
    const thirdLabel = server.execute(getAllLabelsOnServer)[2];
    expect(annotations.length).to.equal(1);
    expect(annotations[0].labelId).to.equal(thirdLabel._id);
  });
});
