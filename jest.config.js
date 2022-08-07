/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
const path = require('path')

const fromRoot = (d) => path.join(__dirname, d)

module.exports = {
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  coverageDirectory: 'coverage',

  // An array of regexp pattern strings used to skip coverage collection
  // coveragePathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  setupFilesAfterEnv: ['./tests/jest-setup.ts'],

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: ['node_modules', fromRoot('tests')],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '~/(.*)': fromRoot('app/$1'),
    'tests/(.*)': fromRoot('tests/$1'),
  },

  // The test environment that will be used for testing
  testEnvironment: 'node',
}
