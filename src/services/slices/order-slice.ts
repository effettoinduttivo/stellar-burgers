import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { getOrders } from './user-slice';

interface OrderState {
  orderData: TOrder | null;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  isLoading: boolean;
  error: SerializedError | null;
}

const initialState: OrderState = {
  orderData: null,
  orderRequest: false,
  orderModalData: null,
  isLoading: false,
  error: null
};

export const getOrderByNumber = createAsyncThunk(
  'order/:number',
  async (number: number) => await getOrderByNumberApi(number)
);

export const makeOrder = createAsyncThunk(
  'order/makeOrder',
  async (ingredients: string[], { dispatch }) => {
    const res = await orderBurgerApi(ingredients);
    await dispatch(getOrders());
    return res.order;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderRequest: (state) => {
      state.orderRequest = true;
    },
    setOrderModalData: (state, action) => {
      state.orderModalData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orderData = action.payload.orders[0];
        state.orderModalData = action.payload.orders[0];
      })
      .addCase(makeOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(makeOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
        state.orderRequest = false;
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orderRequest = false;
        state.orderData = action.payload;
        state.orderModalData = action.payload;
      });
  }
});

export const { setOrderRequest, setOrderModalData } = orderSlice.actions;
export default orderSlice.reducer;
