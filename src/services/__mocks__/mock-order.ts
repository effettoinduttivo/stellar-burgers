import { TOrder } from '@utils-types';

export const mockOrder: TOrder = {
  _id: '123',
  status: 'done',
  name: 'Тестовый заказ',
  createdAt: '2025-07-06T12:00:00.000Z',
  updatedAt: '2025-07-06T12:10:00.000Z',
  number: 1001,
  ingredients: ['1', '2']
};
