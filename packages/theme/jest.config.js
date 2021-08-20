const baseConfig = require("../../jest.config")

module.exports = {
    ...baseConfig, 
    rootDir: '../../',
    testMatch: ["<rootDir>/packages/theme/__tests__/?(*.)+(spec|test).ts?(x)"],
}