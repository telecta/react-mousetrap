module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  transform: { '^.+\\.js$': '<rootDir>/node_modules/babel-jest' },
  roots: ['<rootDir>/__tests__'],
  testPathIgnorePatterns: ['pending'],
  unmockedModulePathPatterns: ['react', 'react-addons-test-utils'],
  modulePathIgnorePatterns: []
};
