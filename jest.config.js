/* eslint-disable no-undef */

module.exports = {
  testPathIgnorePatterns: ['node_modules'],
  transformIgnorePatterns: ['node_modules'],
  globals: {
    __PATH_PREFIX__: '',
  },
  collectCoverageFrom: ['<rootDir>/src/**/*.js'],
  // coverageThreshold: {
  //   global: {
  //     branches: 85,
  //     functions: 88,
  //     lines: 90,
  //   },
  // },
}
