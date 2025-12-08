import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from '../slices/constructor/constructor-slice';
import { mockBun, mockSauce } from '../__mocks__/mock-ingredients';

jest.mock('uuid', () => ({
  v4: () => 'test-uuid'
}));

describe('constructorReducer', () => {
  test('добавляет булку в конструктор', () => {
    const state = constructorReducer(undefined, addIngredient(mockBun));

    expect(state.bun).toEqual({ ...mockBun, id: 'test-uuid' });
    expect(state.ingredients).toEqual([]);
  });

  test('добавляет начинку в конструктор', () => {
    const state = constructorReducer(undefined, addIngredient(mockSauce));

    expect(state.ingredients).toEqual([{ ...mockSauce, id: 'test-uuid' }]);
    expect(state.bun).toBeNull();
  });

  test('удаляет начинку из конструктора', () => {
    const prevState = constructorReducer(undefined, addIngredient(mockSauce));
    const newState = constructorReducer(
      prevState,
      removeIngredient('test-uuid')
    );

    expect(newState.ingredients).toEqual([]);
  });

  test('меняет ингредиенты местами', () => {
    const prevState = {
      bun: null,
      ingredients: [
        { ...mockSauce, id: '1' },
        { ...mockSauce, id: '2' }
      ]
    };
    const newState = constructorReducer(
      prevState,
      moveIngredient({ from: 0, to: 1 })
    );

    expect(newState.ingredients).toEqual([
      { ...mockSauce, id: '2' },
      { ...mockSauce, id: '1' }
    ]);
  });

  test('очищает конструктор', () => {
    let state = constructorReducer(undefined, addIngredient(mockBun));
    state = constructorReducer(state, addIngredient(mockSauce));
    state = constructorReducer(state, clearConstructor());

    expect(state.bun).toBeNull();
    expect(state.ingredients).toEqual([]);
  });
});
