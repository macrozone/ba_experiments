

export default function () {
  browser.waitUntil(function () {
    return !browser.getText('body').includes('Loading');
  }, 10000, 'All loading should vanish');
}
