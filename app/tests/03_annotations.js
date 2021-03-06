/* eslint-env node, mocha */
/* eslint no-unused-expressions: 0*/
/* eslint global-require: 0*/
/* eslint import/newline-after-import: 0*/
import Color from 'color';

import waitForLoading from './inc/wait_for_loading';

import { getSampleCaseOnServer, getAllLabelsOnServer } from './inc/server_data';

const normalizeColor = color => Color(color).rgb().string();


describe('Create Annotations (sc-103)', function () {
  beforeEach(waitForLoading);
  before(function () {
    const { _id } = server.execute(getSampleCaseOnServer);
    browser.setViewportSize({
      width: 800,
      height: 600,
    });
    browser.url(`http://localhost:3000/pet3dviewer/${_id}`);
  });
  describe('AnnotationPanel', function () {
    it('shows Create Annotation title initially', function () {
      expect(browser.getText('body')).to.contain('Create Annotation:');
    });
    it('app has a label-select field', function () {
      const doesExist = browser.waitForExist("[name='label-select']", 5000);
      expect(doesExist).to.be.true;
    });

    it('shows all registered labels on click with name and color (its a searchable select field)', function () {
      browser.click("[name='label-select']");
      const labels = server.execute(getAllLabelsOnServer);
      expect(labels.length > 0).to.be.true;
      labels.forEach(function (label, index) {
        const element = browser.element(`[name='label-select'] .Select-option:nth-child(${index + 1})`);

        expect(element.getText()).to.contain(label.name); // first is "please select"
        const actualColor = normalizeColor(
            element.element('div > span > span').getCssProperty('background-color').value
          );
        const expectedColor = normalizeColor(label.color);
        expect(actualColor).to.equal(expectedColor);
      });
    });


    it('allows to select a label that will shows as value afterwards', function () {
      browser.click("[name='label-select']");
      browser.click('[name=\'label-select\'] .Select-option:nth-child(1)');
      const [firstLabel] = server.execute(getAllLabelsOnServer);

      const valueElement = browser.element('[name=\'label-select\'] .Select-value');

      expect(valueElement.getText()).to.contain(firstLabel.name); // first is "please select"
      const actualColor = normalizeColor(
          valueElement.element('span > span > span').getCssProperty('background-color').value
        );
      const expectedColor = normalizeColor(firstLabel.color);
      expect(actualColor).to.equal(expectedColor);
    });
  });
});
