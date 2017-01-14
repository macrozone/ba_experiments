/* eslint-env node, mocha */
/* eslint no-unused-expressions: 0*/
/* eslint global-require: 0*/
/* eslint import/newline-after-import: 0*/


import waitForLoading from './tools/wait_for_loading';
import expectCanvas from './tools/expect_canvas';


const RECORD_IMAGE = true;

const getFirstCaseOnServer = () => {
  const Cases = require('/lib/collections/cases').default;
  return Cases.findOne({}, { sort: { title: 1 } });
};


describe('Sphere annotation tool @watch', function () {
  beforeEach(waitForLoading);
  before(function () {
    const { _id } = server.execute(getFirstCaseOnServer);
    browser.setViewportSize({
      width: 800,
      height: 600,
    });
    browser.url(`http://localhost:3000/pet3dviewer/${_id}`);
  });
  describe('tool button', function () {
    it('has a button to start the annotation', function () {
      const exists = browser.waitForExist('button=Sphere annotation', 5000);
      expect(exists).to.be.true;
    });

    it('changes its label on click to "Cancel annotation" and back on additional click', function () {
      browser.waitForExist('button=Sphere annotation', 5000);
      const element = browser.element('button=Sphere annotation');
      element.click();
      expect(element.getText()).to.equal('Cancel annotation');
      element.click();
      expect(element.getText()).to.equal('Sphere annotation');
    });

    it('if selected, a sphere is visible on the screen', function () {
      browser.waitForExist('button=Sphere annotation', 5000);
      const element = browser.element('button=Sphere annotation');
      element.click();

      browser.moveToObject('canvas', 200, 200);

      expectCanvas('case1_sphere_active', RECORD_IMAGE);
    });
  });
});
