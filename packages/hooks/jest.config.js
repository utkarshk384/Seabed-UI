const baseConfig = require("../../jest.config")

module.exports = {
    ...baseConfig, 
    rootDir: '../../',
    testMatch: ["<rootDir>/packages/hooks/__tests__/?(*.)+(spec|test).ts?(x)"],
}