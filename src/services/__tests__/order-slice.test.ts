import { SerializedError } from '@reduxjs/toolkit';
import orderReducer, {
  setOrderRequest,
  clearOrderData,
  getOrderByNumber,
  makeOrder
} from '../slices/order/order-slice';
import { mockOrder } from '../__mocks__/mock-order';

describe('orderReducer', () => {
  test('setOrderRequest устанавливает флаг обработки заказа', () => {
    const state = orderReducer(undefined, setOrderRequest());
    expect(state.orderRequest).toBe(true);
  });

  test('clearOrderData очищает данные заказа', () => {
    const filledState = {
      orderData: mockOrder,
      orderModalData: mockOrder,
      orderRequest: true,
      isLoading: true,
      error: { name: 'Error', message: 'Что-то пошло не так' }
    };

    const state = orderReducer(filledState, clearOrderData());

    expect(state).toEqual({
      orderData: null,
      orderModalData: null,
      orderRequest: false,
      isLoading: false,
      error: null
    });
  });

  describe('getOrderByNumber', () => {
    test('pending', () => {
      const action = { type: getOrderByNumber.pending.type };
      const state = orderReducer(undefined, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('rejected', () => {
      const error: SerializedError = {
        message: 'Не удалось загрузить заказ',
        name: 'RejectedError'
      };

      const action = {
        type: getOrderByNumber.rejected.type,
        error
      };

      const state = orderReducer(undefined, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual(error);
    });

    test('fulfilled', () => {
      const action = {
        type: getOrderByNumber.fulfilled.type,
        payload: { orders: [mockOrder] }
      };

      const state = orderReducer(undefined, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.orderData).toEqual(mockOrder);
    });
  });

  describe('makeOrder', () => {
    test('pending', () => {
      const action = { type: makeOrder.pending.type };
      const state = orderReducer(undefined, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.orderRequest).toBe(true);
    });

    test('rejected', () => {
      const error: SerializedError = {
        message: 'Не удалось оформить заказ',
        name: 'OrderError'
      };

      const action = {
        type: makeOrder.rejected.type,
        error
      };

      const state = orderReducer(undefined, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual(error);
      expect(state.orderRequest).toBe(false);
    });

    test('fulfilled', () => {
      const action = {
        type: makeOrder.fulfilled.type,
        payload: mockOrder
      };

      const state = orderReducer(undefined, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.orderRequest).toBe(false);
      expect(state.orderModalData).toEqual(mockOrder);
    });
  });
});
