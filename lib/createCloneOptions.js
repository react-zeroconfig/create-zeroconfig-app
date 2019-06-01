module.exports = function ({branch}) {
  const options = ['--depth=1'];
  if (typeof branch === 'string') {
    options.push('--single-branch', '--branch', branch);
  }
  return options;
};