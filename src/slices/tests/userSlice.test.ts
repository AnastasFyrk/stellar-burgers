import { expect, it, describe } from '@jest/globals';
import { TUser, TOrder } from '@utils-types';
import {
  userSlice,
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  getOrders,
  initialState
} from '../userSlice';
import { ORDER } from './constants';

describe('Тесты работы с userSlice', () => {
  //регистрация пользователя

  it('registerUser.pending', () => {
    const action = {
      type: registerUser.pending.type
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.isAuth).toBe(true);
    expect(state.error).toBe(null);
  });

  it('registerUser.fulfilled', () => {
    const userTest: TUser = { name: 'testName', email: 'testEmail@ya.ru' };
    const action = {
      type: registerUser.fulfilled.type,
      payload: {
        user: userTest,
        accessToken: 'accessTokenTest',
        refreshToken: 'refreshTokenTest'
      }
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.isAuth).toBe(true);
    expect(state.error).toBe(null);
    expect(state.user).toEqual(userTest);
  });

  it('registerUser.rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      error: {
        message: 'Что-то пошло не так :('
      }
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.isAuth).toBe(false);
    expect(state.error).toEqual('Что-то пошло не так :(');
  });

  //логин пользователя

  it('loginUser.pending', () => {
    const action = {
      type: loginUser.pending.type
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.isAuth).toBe(true);
    expect(state.error).toBe(null);
  });

  it('loginUser.fulfilled', () => {
    const userTest: TUser = { name: 'testName', email: 'testEmail@ya.ru' };
    const action = {
      type: loginUser.fulfilled.type,
      payload: {
        user: userTest,
        accessToken: 'accessTokenTest',
        refreshToken: 'refreshTokenTest'
      }
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.isAuth).toBe(true);
    expect(state.error).toBe(null);
    expect(state.user).toEqual(userTest);
  });

  it('loginUser.rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      error: {
        message: 'Что-то пошло не так :('
      }
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.isAuth).toBe(false);
    expect(state.error).toEqual('Что-то пошло не так :(');
    expect(state.user).toBe(null);
  });

  //логаут пользователя

  it('logoutUser.pending', () => {
    const action = {
      type: logoutUser.pending.type
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.error).toBe(null);
  });
  it('logoutUser.fulfilled', () => {
    const action = {
      type: logoutUser.fulfilled.type
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.isAuth).toBe(true);
    expect(state.error).toBe(null);
    expect(state.user).toBe(null);
  });
  it('logoutUser.rejected', () => {
    const action = {
      type: logoutUser.rejected.type,
      error: {
        message: 'Что-то пошло не так :('
      }
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.isAuth).toBe(false);
    expect(state.error).toEqual('Что-то пошло не так :(');
  });

  //получение пользователя

  it('getUser.pending', () => {
    const action = {
      type: getUser.pending.type
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.isAuth).toBe(true);
    expect(state.error).toBe(null);
  });

  it('getUser.fulfilled', () => {
    const userTest: TUser = { name: 'testName', email: 'testEmail@ya.ru' };
    const action = {
      type: getUser.fulfilled.type,
      payload: {
        user: userTest
      }
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.isAuth).toBe(true);
    expect(state.error).toBe(null);
    expect(state.user).toEqual(userTest);
  });

  it('getUser.rejected', () => {
    const action = {
      type: getUser.rejected.type,
      error: {
        message: 'Что-то пошло не так :('
      }
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.error).toEqual('Что-то пошло не так :(');
    expect(state.user).toBe(null);
  });

  //обновление пользователя

  it('updateUser.pending', () => {
    const action = {
      type: updateUser.pending.type
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.isAuth).toBe(true);
    expect(state.error).toBe(null);
  });

  it('updateUser.fulfilled', () => {
    const userTest: TUser = { name: 'testName', email: 'testEmail@ya.ru' };
    const action = {
      type: updateUser.fulfilled.type,
      payload: {
        user: userTest
      }
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.error).toBe(null);
    expect(state.user).toEqual(userTest);
  });

  it('updateUser.rejected', () => {
    const action = {
      type: updateUser.rejected.type,
      error: {
        message: 'Что-то пошло не так :('
      }
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.error).toEqual('Что-то пошло не так :(');
  });

  //получение списка заказов

  it('getOrders.pending', () => {
    const action = {
      type: getOrders.pending.type
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.isAuth).toBe(true);
    expect(state.error).toBe(null);
  });

  it('getOrders.fulfilled', () => {
    const ordersTest: TOrder[] = [ORDER];
    const action = {
      type: getOrders.fulfilled.type,
      payload: ordersTest
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.error).toBe(null);
    expect(state.orders).toEqual(ordersTest);
  });

  it('getOrders.rejected', () => {
    const action = {
      type: getOrders.rejected.type,
      error: {
        message: 'Что-то пошло не так :('
      }
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.error).toEqual('Что-то пошло не так :(');
  });
});
