import { expect, it, describe } from '@jest/globals';
import { TOrder } from '@utils-types';
import { orderSlice, newOrder, deleteOrder, initialState } from '../orderSlice';
import { ORDER } from './constants';

describe('Тесты работы с orderSlice', () => {
  it('newOrder.pending', () => {
    const action = {
      type: newOrder.pending.type
    };
    const state = orderSlice.reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('newOrder.fulfilled', () => {
    const orderTest: TOrder = ORDER;
    const action = {
      type: newOrder.fulfilled.type,
      payload: {
        order: orderTest
      }
    };
    const state = orderSlice.reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.order).toEqual(orderTest);
  });

  it('newOrder.rejected', () => {
    const action = {
      type: newOrder.rejected.type,
      error: {
        message: 'Что-то пошло не так :('
      }
    };
    const state = orderSlice.reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toEqual('Что-то пошло не так :(');
  });

  it('deleteOrder', () => {
    const action = {
      type: deleteOrder.type
    };
    const state = orderSlice.reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });
});
