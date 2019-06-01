const chalk = require('chalk');

module.exports = function (title) {
  console.log('');
  console.log(chalk.bold(title));
  console.log('='.repeat(50) + '-'.repeat(25));
};