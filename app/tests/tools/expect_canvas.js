
import fs from 'fs';

export default (testFile, record = false) => {
  browser.waitForExist('canvas', 5000);

  const path = `${process.cwd()}/tests/data/${testFile}.png`;

  const { value: dataUrl } = browser.execute(() => {
    const canvas = document.getElementsByTagName('canvas')[0];
    return canvas.toDataURL('image/png');
  });
  if (record) {
    const currentContent = fs.readFileSync(path, 'utf8');
    if (currentContent !== dataUrl) {
      fs.writeFileSync(path, dataUrl);
    }
    throw Error('Image was recorded, unset RECORD_IMAGE now');
  } else {
    expect(dataUrl).to.equal(fs.readFileSync(path, 'utf8'));
  }
};
