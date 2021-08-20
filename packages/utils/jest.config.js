const baseConfig = require("../../jest.config")

module.exports = {
    ...baseConfig,
    rootDir: '../../',
    testMatch: ["<rootDir>/packages/utils/__tests__/?(*.)+(spec|test).ts?(x)"],
}