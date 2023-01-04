/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
module.exports = {
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: 'web/assets/javascripts',
  testRegex: '.*\\.spec\\.ts$',
  testPathIgnorePatterns: ['/node_modules/', '/build/', '/dist/', '/types/'],
  transform: {
    '^.+\\.(t|j)s$': [
      'esbuild-jest',
      {
        sourcemap: true,
      },
    ],
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coveragePathIgnorePatterns: ['/node_modules/', 'application.ts'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
    'web/assets/javascripts/helpers/**/*.ts': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  coverageDirectory: '../../../build/coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@(|/.*)$': '<rootDir>/$1',
  },
}
