

export default (test) => {
  return test.fullTitle().replace('@watch', '').trim();
};
