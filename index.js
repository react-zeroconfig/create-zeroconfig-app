const run = require('./lib/run');

module.exports = function ({targetDirectory, repository, cwd = process.cwd()}) {
  run({targetDirectory, repository, cwd});
};