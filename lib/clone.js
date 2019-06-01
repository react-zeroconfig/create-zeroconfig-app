const path = require('path');
const git = require('simple-git/promise');
const {spawn} = require('child_process');
const rimraf = require('rimraf');
const createCloneOptions = require('./createCloneOptions');
const sayTitle = require('./sayTitle');

module.exports = async function ({targetDirectory, repository, branch, cwd}) {
  const repoPath = `https://github.com/${repository}.git`;
  const localPath = path.join(cwd, targetDirectory);
  
  sayTitle('GIT CLONE');
  const options = createCloneOptions({branch});
  console.log(`git clone ${repoPath} ${localPath} ${options.join(' ')}`);
  await git(cwd).clone(repoPath, localPath, options);
  rimraf.sync(path.join(localPath, '.git'));
  
  sayTitle('NPM INSTALL');
  spawn('npm', ['install'], {cwd: localPath, stdio: 'inherit'});
};