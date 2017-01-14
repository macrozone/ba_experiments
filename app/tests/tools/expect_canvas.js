import fs from 'fs';

import waitForLoading from './wait_for_loading';

const encode = (dataUrl) => {
  const regex = /^data:.+\/(.+);base64,(.*)$/;
  const matches = dataUrl.match(regex);
  const data = matches[2];
  return new Buffer(data, 'base64');
};

const decode = (data) => {
  return `data:image/png;base64,${new Buffer(data, 'binary').toString('base64')}`;
};
export default (testFile, record = false) => {
  browser.waitForExist('canvas', 5000);

  const path = `${process.cwd()}/tests/data/${testFile}.png`;

  const { value: dataUrl } = browser.execute(() => {
    const canvas = document.getElementsByTagName('canvas')[0];
    return canvas.toDataURL('image/png');
  });
  if (record) {
    const currentContent = fs.existsSync(path) && fs.readFileSync(path, 'utf8');
    if (currentContent !== dataUrl) {
      const buffer = encode(dataUrl);
      fs.writeFileSync(path, buffer);
    }
    throw Error('Image was recorded, unset RECORD_IMAGE now');
  } else {
    expect(dataUrl).to.equal(decode(fs.readFileSync(path, 'utf8')));
  }
};
