/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const baseConfig = require("../../jest.config")

module.exports = {
    ...baseConfig, 
    rootDir: '../../',
    testMatch: ["<rootDir>/packages/assets/__tests__/?(*.)+(spec|test).ts?(x)"],
}