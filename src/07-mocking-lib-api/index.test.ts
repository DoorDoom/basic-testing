// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  const userTodo = {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false,
  };

  test('should create instance with provided base url', async () => {
    const createdObj = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('/todos/1');
    expect(createdObj).toHaveBeenCalled();
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('/todos/1');
    expect(() => throttledGetDataFromApi('/todos/1')).not.toThrow();
  });

  test('should return response data', async () => {
    const resp = await throttledGetDataFromApi('/todos/1');
    expect(JSON.stringify(resp)).toBe(JSON.stringify(userTodo));
  });
});
