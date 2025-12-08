import { TIngredient } from '@utils-types';

export const mockBun: TIngredient = {
  _id: '1',
  name: 'Булка',
  type: 'bun',
  proteins: 10,
  fat: 20,
  carbohydrates: 30,
  calories: 300,
  price: 100,
  image: '',
  image_large: '',
  image_mobile: ''
};

export const mockSauce: TIngredient = {
  _id: '2',
  name: 'Соус',
  type: 'sauce',
  proteins: 0,
  fat: 50,
  carbohydrates: 30,
  calories: 50,
  price: 25,
  image: '',
  image_large: '',
  image_mobile: ''
};
