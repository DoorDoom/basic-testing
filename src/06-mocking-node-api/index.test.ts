// Uncomment the code below and write your tests
import path from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  const callback = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const fakeSetTimeout = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 3000);
    expect(fakeSetTimeout).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const fakeSetTimeout = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 3000);
    expect(fakeSetTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);
  });
});

describe('doStuffByInterval', () => {
  const callback = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(callback, 3000);
    jest.advanceTimersByTime(9000);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const fakeSetInterval = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, 3000);
    jest.advanceTimersByTime(9000);
    expect(fakeSetInterval).toHaveBeenCalledWith(expect.any(Function), 3000);
    expect(callback).toHaveBeenCalledTimes(6);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const fakePath = jest.spyOn(path, 'join');
    readFileAsynchronously('./text1.txt');
    expect(fakePath).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    expect(readFileAsynchronously('./text1.txt')).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    expect(readFileAsynchronously('./text.txt')).resolves.toBe(
      `text text there is text!`,
    );
  });
});
