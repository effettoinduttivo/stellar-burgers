import userReducer, {
  setAuthChecked,
  registerUser,
  loginUser,
  getUser,
  logoutUser,
  updateUser,
  getOrders
} from '../slices/user/user-slice';
import { TOrder } from '@utils-types';
import { mockUser } from '../__mocks__/mock-user';
import { mockOrder } from '../__mocks__/mock-order';

const mockOrders: TOrder[] = [mockOrder];

describe('userReducer', () => {
  test('setAuthChecked устанавливает флаг пройденной авторизации', () => {
    const state = userReducer(undefined, setAuthChecked());
    expect(state.isAuthChecked).toBe(true);
  });

  describe('registerUser', () => {
    test('pending', () => {
      const action = { type: registerUser.pending.type };
      const state = userReducer(undefined, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });

    test('rejected', () => {
      const action = {
        type: registerUser.rejected.type,
        error: { name: 'RegisterError', message: 'Ошибка регистрации' }
      };
      const state = userReducer(undefined, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual(action.error);
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });

    test('fulfilled', () => {
      const action = { type: registerUser.fulfilled.type, payload: mockUser };
      const state = userReducer(undefined, action);

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });
  });

  describe('loginUser', () => {
    test('pending', () => {
      const action = { type: loginUser.pending.type };
      const state = userReducer(undefined, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isAuthChecked).toBe(false);
    });

    test('rejected', () => {
      const action = {
        type: loginUser.rejected.type,
        error: { name: 'AuthError', message: 'Неверный логин' }
      };
      const state = userReducer(undefined, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual(action.error);
      expect(state.isAuthChecked).toBe(true);
    });

    test('fulfilled', () => {
      const action = { type: loginUser.fulfilled.type, payload: mockUser };
      const state = userReducer(undefined, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });
  });

  describe('getUser', () => {
    test('pending', () => {
      const action = { type: getUser.pending.type };
      const state = userReducer(undefined, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isAuthChecked).toBe(false);
    });

    test('rejected', () => {
      const action = {
        type: getUser.rejected.type,
        error: { name: 'userError', message: 'Ошибка получения пользователя' }
      };
      const state = userReducer(undefined, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual(action.error);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(false);
    });

    test('fulfilled', () => {
      const action = { type: getUser.fulfilled.type, payload: mockUser };
      const state = userReducer(undefined, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('logoutUser', () => {
    const initialState = {
      user: mockUser,
      orders: mockOrders,
      isAuthenticated: true,
      isAuthChecked: false,
      isOrdersLoaded: true,
      isLoading: false,
      error: null
    };

    test('pending', () => {
      const action = { type: logoutUser.pending.type };
      const state = userReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('rejected', () => {
      const action = {
        type: logoutUser.rejected.type,
        error: { name: 'logoutError', message: 'Ошибка выхода' }
      };
      const state = userReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual(action.error);
    });

    test('fulfilled', () => {
      const action = { type: logoutUser.fulfilled.type };
      const state = userReducer(initialState, action);

      expect(state.user).toBeNull();
      expect(state.orders).toEqual([]);
      expect(state.isAuthenticated).toBe(false);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isOrdersLoaded).toBe(false);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('updateUser', () => {
    test('pending', () => {
      const action = { type: updateUser.pending.type };
      const state = userReducer(undefined, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('rejected', () => {
      const action = {
        type: updateUser.rejected.type,
        error: { name: 'updateError', message: 'Ошибка обновления данных' }
      };
      const state = userReducer(undefined, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual(action.error);
    });

    test('fulfilled', () => {
      const action = { type: updateUser.fulfilled.type, payload: mockUser };
      const state = userReducer(undefined, action);

      expect(state.user).toEqual(mockUser);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('getOrders', () => {
    test('pending', () => {
      const action = { type: getOrders.pending.type };
      const state = userReducer(undefined, action);

      expect(state.isOrdersLoaded).toBe(false);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('rejected', () => {
      const action = {
        type: getOrders.rejected.type,
        error: { name: 'userOrdersError', message: 'Ошибка получения заказов' }
      };
      const state = userReducer(undefined, action);

      expect(state.isOrdersLoaded).toBe(false);
      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual(action.error);
    });

    test('fulfilled', () => {
      const action = { type: getOrders.fulfilled.type, payload: mockOrders };
      const state = userReducer(undefined, action);

      expect(state.orders).toEqual(mockOrders);
      expect(state.isOrdersLoaded).toBe(true);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });
  });
});
