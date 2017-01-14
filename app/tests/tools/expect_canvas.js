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
const readFileAsDataUrl = (path) => {
  return decode(fs.readFileSync(path));
};
export default (testFile, record = false) => {
  browser.waitForExist('canvas', 5000);
  waitForLoading();
  const path = `${process.cwd()}/tests/regression-images/${testFile}.png`;

  const { value: dataUrl } = browser.execute(() => {
    const canvas = document.getElementsByTagName('canvas')[0];
    return canvas.toDataURL('image/png');
  });
  if (record) {
    console.warn('recording image');
    const currentContent = fs.existsSync(path) && readFileAsDataUrl(path);
    if (currentContent !== dataUrl) {
      const buffer = encode(dataUrl);
      fs.writeFileSync(path, buffer);
    }
    throw Error('Image was recorded');
  } else {
    expect(dataUrl).to.equal(readFileAsDataUrl(path));
  }
};
