/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest/dist",
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
      babelConfig: true
    },
  },
  projects: [ '<rootDir>/packages/*/jest.config.js'],
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverageFrom: [
      '<rootDir>/packages/*/src/**/*.{ts,tsx}',
  ],
  preset: 'ts-jest',
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./test-utils/setupTests.ts"]
};