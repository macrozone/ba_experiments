/* eslint-env node, mocha */
/* eslint no-unused-expressions: 0*/
/* eslint global-require: 0*/
/* eslint import/newline-after-import: 0*/


import expectCanvas from './tools/expect_canvas';
import getImageFileForTest from './tools/get_image_file_for_test';


import waitForLoading from './tools/wait_for_loading';


const getFirstCaseOnServer = () => {
  const Cases = require('/lib/collections/cases').default;
  return Cases.findOne({}, { sort: { title: 1 } });
};


describe('View a case (sc-102)', function () {
  beforeEach(waitForLoading);
  before(function () {
    const { _id } = server.execute(getFirstCaseOnServer);
    browser.setViewportSize({
      width: 800,
      height: 600,
    });
    browser.url(`http://localhost:3000/pet3dviewer/${_id}`);
    waitForLoading();
  });
  it('shows title of case on the page', function () {
    const { title } = server.execute(getFirstCaseOnServer);
    expect(browser.getText('body')).to.contain(title);
  });

  it('renders 3d image on scene of the selected case @watch', function () {
    expectCanvas(getImageFileForTest(this.test), process.env.RECORD);
  });
});
