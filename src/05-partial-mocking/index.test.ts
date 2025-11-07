// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(() => 'mockOne'),
    mockTwo: jest.fn(() => 'mockTwo'),
    mockThree: jest.fn(() => 'mockThree'),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test.each([mockOne, mockTwo, mockThree])(
    'mockOne, mockTwo, mockThree should not log into console',
    (func) => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      func();
      expect(logSpy).not.toHaveBeenCalled();
    },
  );

  test('unmockedFunction should log into console', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    unmockedFunction();
    expect(logSpy).toHaveBeenCalledWith('I am not mocked');
    logSpy.mockRestore();
  });
});
