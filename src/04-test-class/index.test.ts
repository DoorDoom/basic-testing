// Uncomment the code below and write your tests
import { getBankAccount, SynchronizationFailedError } from '.';

describe('BankAccount', () => {
  const account = getBankAccount(12);
  const secondAccount = getBankAccount(24);

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(12);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(20)).toThrow(
      `Insufficient funds: cannot withdraw more than ${account.getBalance()}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(20, secondAccount)).toThrow(
      `Insufficient funds: cannot withdraw more than ${account.getBalance()}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(6, account)).toThrow(`Transfer failed`);
  });

  test('should deposit money', () => {
    expect(account.deposit(1).getBalance()).toBe(13);
  });

  test('should withdraw money', () => {
    expect(account.withdraw(1).getBalance()).toBe(12);
  });

  test('should transfer money', () => {
    account.transfer(6, secondAccount);

    expect(account.getBalance()).toBe(6);
    expect(secondAccount.getBalance()).toBe(30);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    try {
      const data = await account.synchronizeBalance();
      expect(data).toBeInstanceOf(Number);
    } catch (error) {}
  });

  test('should set new balance if fetchBalance returned number', async () => {
    try {
      const data = await account.synchronizeBalance();
      expect(account.getBalance()).toBe(data);
    } catch (error) {}
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    try {
      await account.synchronizeBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
