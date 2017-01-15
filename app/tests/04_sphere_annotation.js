/* eslint-env node, mocha */
/* eslint no-unused-expressions: 0*/
/* eslint global-require: 0*/
/* eslint import/newline-after-import: 0*/


import expectCanvas from './inc/expect_canvas';
import getImageFileForTest from './inc/get_image_file_for_test';
import waitForLoading from './inc/wait_for_loading';

import { clearAnnotationsOnServer, getSampleCaseOnServer, getAllLabelsOnServer, getAnnotationsOnServer } from './inc/server_data';

describe('Sphere annotation tool', function () {
  beforeEach(function () {
    server.execute(clearAnnotationsOnServer);
    const { _id } = server.execute(getSampleCaseOnServer);
    browser.setViewportSize({
      width: 800,
      height: 600,
    });
    browser.url(`http://localhost:3000/pet3dviewer/${_id}`);
    waitForLoading();
    if (browser.isExisting('button=Cancel annotation')) {
      browser.click('button=Cancel annotation');
    }
  });

  it('has a button to start the annotation', function () {
    const exists = browser.waitForExist('button=Sphere annotation', 5000);
    expect(exists).to.be.true;
  });

  it('changes its label on click to "Cancel annotation" and back on additional click', function () {
    browser.waitForExist('button=Sphere annotation', 5000);
    const toolButton = browser.element('button=Sphere annotation');
    toolButton.click();
    expect(toolButton.getText()).to.equal('Cancel annotation');
    toolButton.click();

    expect(toolButton.getText()).to.equal('Sphere annotation');
  });

  it('if selected, a sphere-cursor is visible on the screen', function () {
    browser.waitForExist('button=Sphere annotation', 5000);
    const toolButton = browser.element('button=Sphere annotation');
    toolButton.click();
    browser.moveToObject('canvas', 250, 250);
    expectCanvas(getImageFileForTest(this.test), process.env.RECORD);
  });

  it('sets a line after first click', function () {
    browser.waitForExist('button=Sphere annotation', 5000);
    const toolButton = browser.element('button=Sphere annotation');
    toolButton.click();

    browser.moveToObject('canvas', 250, 250); // move mouse there
    browser.leftClick(); // click to create annotation

      // drag to rotate
    browser.buttonDown();
    browser.moveToObject('canvas', 350, 280);
    browser.buttonUp();

    expectCanvas(getImageFileForTest(this.test), process.env.RECORD);
  });

  it('allows to set position on that line after rotation', function () {
    browser.waitForExist('button=Sphere annotation', 5000);
    const toolButton = browser.element('button=Sphere annotation');
    toolButton.click();

    browser.moveToObject('canvas', 250, 250); // move mouse there

    browser.leftClick(); // click to create annotation

      // drag to rotate
    browser.buttonDown();

    browser.moveToObject('canvas', 350, 280);

    browser.buttonUp();
    browser.moveToObject('canvas', 200, 220);

    browser.leftClick();

    expectCanvas(getImageFileForTest(this.test), process.env.RECORD);
  });

  it('allows to set set radius', function () {
    const toolButton = browser.element('button=Sphere annotation');
    toolButton.click();

    browser.moveToObject('canvas', 250, 250); // move mouse there

    browser.leftClick(); // click to create annotation

      // drag to rotate
    browser.buttonDown();

    browser.moveToObject('canvas', 350, 280);

    browser.buttonUp();
    browser.moveToObject('canvas', 200, 220);

    browser.leftClick();

    browser.moveToObject('canvas', 240, 260);

    expectCanvas(getImageFileForTest(this.test), process.env.RECORD);
  });

  it('shows an alert when no label is selected on last click', function () {
    const toolButton = browser.element('button=Sphere annotation');
    toolButton.click();
    browser.moveToObject('canvas', 250, 250); // move mouse there
    browser.leftClick(); // click to create annotation

      // drag to rotate
    browser.buttonDown();
    browser.moveToObject('canvas', 350, 280);

    browser.buttonUp();
    browser.moveToObject('canvas', 200, 220);

    browser.leftClick();

    browser.moveToObject('canvas', 240, 260);
    browser.pause(100);

    browser.leftClick();
    expect(browser.alertText()).to.equal('Please select a label');
    browser.pause(200);
    browser.alertAccept();
  });

  it('stores the annotation when label was selected on last click', function () {
    const { _id } = server.execute(getSampleCaseOnServer);
    const toolButton = browser.element('button=Sphere annotation');
    toolButton.click();
    browser.click('[name=\'label-select\']');

    // we select the second label
    browser.click('[name=\'label-select\'] .Select-option:nth-child(2)'); // 1-based
    const actualLabel = server.execute(getAllLabelsOnServer)[1]; // zero-based
    browser.moveToObject('canvas', 250, 250); // move mouse there

    browser.leftClick(); // click to create annotation
      // drag to rotate
    browser.buttonDown();
    browser.moveToObject('canvas', 350, 280);

    browser.buttonUp();
    browser.moveToObject('canvas', 200, 220);
    browser.leftClick();

    browser.moveToObject('canvas', 240, 260);
    browser.pause(100);

    browser.leftClick();
    expectCanvas(getImageFileForTest(this.test), process.env.RECORD);
    browser.pause(500); // because ui is optimistic, this is not totally easy to find the right time to check on the server


    const annotations = server.execute(getAnnotationsOnServer, _id);
    expect(annotations.length).to.equal(1);
    expect(annotations[0].caseId).to.equal(_id);
    expect(annotations[0].labelId).to.equal(actualLabel._id);
  });
});
