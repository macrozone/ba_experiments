/* eslint-env node, mocha */
/* eslint no-unused-expressions: 0*/
/* eslint global-require: 0*/
/* eslint import/newline-after-import: 0*/

import waitForLoading from './inc/wait_for_loading';


import { getCasesCountOnServer, getFirstCaseOnServer } from './inc/server_data';

describe('case-select (sc-101)', function () {
  before(function () {
    browser.url('http://localhost:3000/pet3dviewer');
  });

  beforeEach(waitForLoading);
  beforeEach(function () {
    browser.waitForExist("[name='case-select']", 5000);
  });

  it('shows a case-select component', function () {
    const doesExist = browser.waitForExist("[name='case-select']", 5000);
    expect(doesExist).to.be.true;
  });

  it('shows "(please select)" as first options', function () {
    const firstOptionText = browser.getText("[name='case-select'] > option:nth-child(1)");
    expect(firstOptionText).to.equal('(please select)');
  });

  it('shows all registered pet-cases', function () {
    const options = browser.elements("[name='case-select'] > option");
    const count = server.execute(getCasesCountOnServer);
    expect(options.value.length).to.equal(count + 1); // first is "please select"
  });

  it('shows the cases sorted by title and with their title as label', function () {
    const firstCaseOption = browser.getText("[name='case-select'] > option:nth-child(2)");
    const { title } = server.execute(getFirstCaseOnServer);
    expect(firstCaseOption).to.equal(title);
  });

  it('allows to navigate to a case on select', function () {
    const { _id } = server.execute(getFirstCaseOnServer);

    browser.selectByValue("[name='case-select']", _id);
    const newUrl = browser.getUrl();
    expect(newUrl).to.equal(`http://localhost:3000/pet3dviewer/${_id}`);
  });
});
