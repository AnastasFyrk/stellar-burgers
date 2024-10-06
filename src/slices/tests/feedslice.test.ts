import { expect, it, describe } from '@jest/globals';
import { feedSlice, getFeeds, initialState } from '../feedslice';
import { ORDER } from './constants';

describe('Тесты работы с feedslice', () => {
  const ordersTest = {
    orders: [ORDER],
    total: 1000,
    totalToday: 100,
    success: true
  };

  it('getFeeds.pending', () => {
    const action = {
      type: getFeeds.pending.type
    };
    const state = feedSlice.reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('getFeeds.fulfilled', () => {
    const baseState = {
      ...initialState,
      orders: ordersTest.orders,
      total: ordersTest.total,
      totalToday: ordersTest.totalToday
    };
    const action = {
      type: getFeeds.fulfilled.type,
      payload: ordersTest
    };
    const state = feedSlice.reducer(initialState, action);

    expect(state).toEqual(baseState);
  });

  it('getFeeds.rejected', () => {
    const action = {
      type: getFeeds.rejected.type,
      error: {
        message: 'Что-то пошло не так :('
      }
    };
    const state = feedSlice.reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toEqual('Что-то пошло не так :(');
  });
});
