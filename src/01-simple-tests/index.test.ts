// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 12, b: 278, action: Action.Add })).toBe(290);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 12, b: 278, action: Action.Subtract })).toBe(
      -266,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 12, b: 27, action: Action.Multiply })).toBe(
      324,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 12, b: 0, action: Action.Divide })).toBe(
      Infinity,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 12, b: 4, action: Action.Exponentiate })).toBe(
      20736,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 12, b: 4, action: 'plus' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '12', b: 4, action: Action.Divide })).toBe(
      null,
    );
  });
});
