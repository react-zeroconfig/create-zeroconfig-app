const createCloneOptions = require('./createCloneOptions');

describe('createCloneOptions', () => {
  test('branch is undefined', () => {
    expect(createCloneOptions({})).toEqual(['--depth=1']);
  });
  
  test('branch is exists', () => {
    expect(createCloneOptions({branch: 'something'})).toEqual(['--depth=1', '--single-branch', '--branch', 'something']);
  });
});