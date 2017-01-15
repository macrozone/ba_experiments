/* eslint-env node, mocha */
/* eslint no-unused-expressions: 0*/
/* eslint global-require: 0*/
/* eslint import/newline-after-import: 0*/


import expectCanvas from './inc/expect_canvas';
import getImageFileForTest from './inc/get_image_file_for_test';


import waitForLoading from './inc/wait_for_loading';

import { getSampleCaseOnServer, clearAnnotationsOnServer } from './inc/server_data';


describe('View a case (sc-102)', function () {
  beforeEach(waitForLoading);
  beforeEach(function () {
    server.execute(clearAnnotationsOnServer);
  });
  before(function () {
    const { _id } = server.execute(getSampleCaseOnServer);
    browser.setViewportSize({
      width: 800,
      height: 600,
    });
    browser.url(`http://localhost:3000/pet3dviewer/${_id}`);
    waitForLoading();
  });
  it('shows title of case on the page', function () {
    const { title } = server.execute(getSampleCaseOnServer);
    expect(browser.getText('body')).to.contain(title);
  });

  it('renders 3d image on scene of the selected case', function () {
    expectCanvas(getImageFileForTest(this.test), process.env.RECORD);
  });
});
