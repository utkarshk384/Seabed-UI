const core = require('./packages/core/package.json');
const utils = require('./packages/utils/package.json');
const preset = require('./packages/preset/package.json');

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
      displayName: preset.name,
      testMatch: ['<rootDir>/packages/preset/tests/**/?(*.)+(spec|test).[jt]s?(x)'],
    },
    {
      preset: 'ts-jest/presets/js-with-ts',

      displayName: utils.name,
      testMatch: ['<rootDir>/packages/utils/tests/**/?(*.)+(spec|test).[jt]s?(x)'],
    },
  ],
};