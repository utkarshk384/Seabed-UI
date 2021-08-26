const baseConfig = require("../../jest.config")

module.exports = {
    ...baseConfig, 
    rootDir: '../../',
    testMatch: ["<rootDir>/packages/color-scheme/__tests__/?(*.)+(spec|test).ts?(x)"],
}