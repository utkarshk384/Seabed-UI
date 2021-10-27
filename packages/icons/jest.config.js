const baseConfig = require("../../jest.config")

module.exports = {
    ...baseConfig,
    rootDir: '../../',
    testMatch: ["<rootDir>/packages/icons/__tests__/?(*.)+(spec|test).ts?(x)"],
}