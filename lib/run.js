const clone = require('./clone');
const prompt = require('./prompt');
const sayTitle = require('./sayTitle');

module.exports = async function ({targetDirectory, getRepositories = registry, repository, cwd = process.cwd()}) {
  const repositories = await getRepositories();
  
  if (repository) {
    await clone({targetDirectory, repository, cwd});
  } else {
    sayTitle('SELECT SEED REPOSITORY');
    const answer = await prompt({repositories});
    const {repository, branch} = answer.repository;
    await clone({targetDirectory, repository, branch, cwd});
  }
};