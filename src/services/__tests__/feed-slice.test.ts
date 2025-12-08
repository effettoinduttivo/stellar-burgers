import { SerializedError } from '@reduxjs/toolkit';
import feedReducer, { fetchFeed } from '../slices/feed/feed-slice';
import { TOrder } from '@utils-types';
import { mockOrder } from '../__mocks__/mock-order';

describe('feedReducer', () => {
  const mockOrders: TOrder[] = [mockOrder];

  test('fetchFeed.pending', () => {
    const action = { type: fetchFeed.pending.type };
    const state = feedReducer(undefined, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.orders).toEqual([]);
  });

  test('fetchFeed.rejected', () => {
    const error: SerializedError = {
      message: 'Ошибка загрузки',
      name: 'RejectedError'
    };

    const action = {
      type: fetchFeed.rejected.type,
      error
    };

    const state = feedReducer(undefined, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual(error);
  });

  test('fetchFeed.fulfilled', () => {
    const action = {
      type: fetchFeed.fulfilled.type,
      payload: {
        orders: mockOrders,
        total: 500,
        totalToday: 50
      }
    };

    const state = feedReducer(undefined, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(500);
    expect(state.totalToday).toBe(50);
  });
});
