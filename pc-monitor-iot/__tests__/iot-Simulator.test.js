/* eslint-disable no-undef */

// Mock axios to avoid real HTTP requests
jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ status: 200 }))
}));

// Mock fs to avoid real file operations
jest.mock('fs', () => {
  const original = jest.requireActual('fs');
  return {
    ...original,
    writeFileSync: jest.fn(),
    readFileSync: jest.fn(() => '[]'),
    existsSync: jest.fn(() => false)
  };
});

// Mock global setInterval to prevent actual interval creation
jest.spyOn(global, 'setInterval').mockImplementation(() => 0);

// Use fake timers to prevent intervals executing
jest.useFakeTimers();

test('iot-Simulator script loads without throwing', () => {
  expect(() => {
    require('../iot-Simulator.js');
  }).not.toThrow();
}); 