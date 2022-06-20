const core = require('./packages/core/package.json');
const utils = require('./packages/utils/package.json');

module.exports = {
  verbose: true,
  projects: [
    {
      preset: 'ts-jest/presets/js-with-ts',
      displayName: core.name,
      testMatch: ['<rootDir>/packages/core/tests/**/?(*.)+(spec|test).[jt]s?(x)'],
    },
    {
      preset: 'ts-jest/presets/js-with-ts',

      displayName: utils.name,
      testMatch: ['<rootDir>/packages/utils/tests/**/?(*.)+(spec|test).[jt]s?(x)'],
    },
  ],
};