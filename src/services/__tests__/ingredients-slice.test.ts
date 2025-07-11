import { SerializedError } from '@reduxjs/toolkit';
import ingredientReducer, {
  getIngredients
} from '../slices/ingredients/ingredients-slice';
import { TIngredient } from '@utils-types';
import { mockBun, mockSauce } from '../__mocks__/mock-ingredients';

describe('ingredientReducer', () => {
  const mockIngredients: TIngredient[] = [mockBun, mockSauce];

  test('getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientReducer(undefined, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.ingredients).toEqual([]);
  });

  test('getIngredients.rejected', () => {
    const error: SerializedError = {
      message: 'Ошибка загрузки',
      name: 'RejectedError'
    };

    const action = {
      type: getIngredients.rejected.type,
      error
    };

    const state = ingredientReducer(undefined, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual(error);
  });

  test('getIngredients.fulfilled', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };

    const state = ingredientReducer(undefined, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.ingredients).toEqual(mockIngredients);
  });
});
