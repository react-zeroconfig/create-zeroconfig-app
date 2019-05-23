const fetch = require('node-fetch');
const prompts = require('prompts');
const path = require('path');
const git = require('simple-git/promise');
const {spawn} = require('child_process');
const chalk = require('chalk');
const rimraf = require('rimraf');

function sayTitle(title) {
  console.log('');
  console.log(chalk.bold(title));
  console.log('='.repeat(50) + '-'.repeat(25));
}

async function run(targetDirectory) {
  const res = await fetch('https://raw.githubusercontent.com/react-zeroconfig/create-zeroconfig-app-registry/master/index.json');
  const data = await res.json();
  
  sayTitle('SELECT SEED REPOSITORY');
  const answer = await prompts({
    type: 'select',
    name: 'repository',
    message: 'Select repository',
    choices: data.map(({repository, description}) => {
      return {
        title: `${repository} : ${description}`,
        value: repository,
      };
    }),
  });
  
  const repoPath = `https://github.com/${answer.repository}.git`;
  const localPath = path.join(process.cwd(), targetDirectory);
  
  sayTitle('GIT CLONE');
  await git(process.cwd()).clone(repoPath, localPath, ['--depth=1']);
  rimraf.sync(path.join(localPath, '.git'));
  
  sayTitle('NPM INSTALL');
  spawn('npm', ['install'], {cwd: localPath, stdio: 'inherit'});
}

module.exports = function (argv) {
  run(...argv);
};