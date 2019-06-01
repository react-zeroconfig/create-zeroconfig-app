const prompts = require('prompts');

module.exports = async function ({repositories}) {
  return await prompts({
    type: 'select',
    name: 'repository',
    message: 'Select repository',
    choices: repositories.map(item => {
      return {
        title: `${item.repository} : ${item.description}`,
        value: item,
      };
    }),
  });
};