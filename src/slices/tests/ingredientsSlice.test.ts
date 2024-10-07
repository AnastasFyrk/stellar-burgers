import { expect, it, describe } from '@jest/globals';
import { TIngredient } from '@utils-types';
import {
  ingredientsSlice,
  getIngredients,
  initialState
} from '../ingredientsSlice';

describe('Тесты работы с ingredientsSlice', () => {
  it('getIngredients.pending', () => {
    const action = {
      type: getIngredients.pending.type
    };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('getIngredients.fulfilled', () => {
    const ingredientsTest: TIngredient[] = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa0943',
        name: 'Соус фирменный Space Sauce',
        type: 'sauce',
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
      }
    ];
    const action = {
      type: getIngredients.fulfilled.type,
      payload: ingredientsTest
    };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.ingredients).toEqual(ingredientsTest);
  });

  it('getIngredients.rejected', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: {
        message: 'Что-то пошло не так :('
      }
    };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toEqual('Что-то пошло не так :(');
  });
});
