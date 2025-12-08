import { rootReducer } from '../store';

describe('rootReducer', () => {
  test('проверяет начальное состояние хранилища', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toHaveProperty('burger');
    expect(state.burger.bun).toBeNull();
    expect(state.burger.ingredients).toEqual([]);

    expect(state).toHaveProperty('feed');

    expect(state).toHaveProperty('ingredients');
    expect(state.ingredients.ingredients).toHaveLength(0);

    expect(state).toHaveProperty('order');
    expect(state.order.orderData).toBeNull();
    expect(state.order.isLoading).toBe(false);

    expect(state).toHaveProperty('user');
    expect(state.user.user).toBeNull();
    expect(state.user.isAuthenticated).toBe(false);
  });
});
