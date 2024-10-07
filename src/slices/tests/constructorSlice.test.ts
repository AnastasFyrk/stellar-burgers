import { expect, it, describe } from '@jest/globals';
import { TConstructorIngredient } from '@utils-types';
import {
  constructorSlice,
  addIngredient,
  deleteIngredient,
  removeConstructor,
  moveUp,
  moveDown,
  initialState,
  TConstructorState
} from '../constructorSlice';

describe('Тесты работы с constructorSlice', () => {
  let baseState: TConstructorState;

  const ingredient: TConstructorIngredient = {
    _id: '1',
    id: '1',
    name: 'testName',
    type: 'main',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 100,
    image: 'testImage',
    image_mobile: 'testImageMobile',
    image_large: 'testImageLarge'
  };

  const bun: TConstructorIngredient = {
    _id: '2',
    id: '2',
    name: 'testName',
    type: 'bun',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 200,
    image: 'testImage',
    image_mobile: 'testImageMobile',
    image_large: 'testImageLarge'
  };

  beforeEach(() => {
    baseState = {
      ingredients: [],
      bun: null
    };
  });

  it('addIngredient', () => {
    const action = {
      type: addIngredient.type,
      payload: ingredient
    };
    const newState = constructorSlice.reducer(baseState, action);

    expect(newState.ingredients.length).toBe(1);
    expect(newState.ingredients[0]).toEqual(ingredient);
  });

  it('deleteIngredient', () => {
    const constructorIngredients = {
      ...ingredient,
      id: '1'
    };
    baseState.ingredients.push(constructorIngredients);
    const action = {
      type: deleteIngredient.type,
      payload: ingredient._id
    };
    const newState = constructorSlice.reducer(baseState, action);

    expect(newState.ingredients).not.toContain(ingredient);
  });

  it('removeConstructor', () => {
    const action = {
      type: removeConstructor.type
    };
    const newState = constructorSlice.reducer(baseState, action);

    expect(newState).toEqual(initialState);
  });

  it('moveUp', () => {
    const constructorIngredients = {
      ...ingredient,
      id: '1'
    };
    const constructorBun = {
      ...bun,
      id: '2'
    };
    baseState.ingredients.push(constructorIngredients, constructorBun);
    const action = {
      type: moveUp.type,
      payload: 1
    };
    const newState = constructorSlice.reducer(baseState, action);

    expect(newState.ingredients[0]).toEqual(bun);
    expect(newState.ingredients[1]).toEqual(ingredient);
  });

  it('moveDown', () => {
    const constructorIngredients = {
      ...ingredient,
      id: '1'
    };
    const constructorBun = {
      ...bun,
      id: '2'
    };
    baseState.ingredients.push(constructorIngredients, constructorBun);
    const action = {
      type: moveDown.type,
      payload: 0
    };
    const newState = constructorSlice.reducer(baseState, action);

    expect(newState.ingredients[0]).toEqual(bun);
    expect(newState.ingredients[1]).toEqual(ingredient);
  });
});
