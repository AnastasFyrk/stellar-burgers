import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { userReducer } from '../slices/userSlice';
import { constructorReducer } from '../slices/constructorSlice';
import { ingredientsReducer } from '../slices/ingredientsSlice';
import { orderReducer } from '../slices/orderSlice';
import { feedReducer } from '../slices/feedslice';

const rootReducer = combineReducers({
  user: userReducer,
  burgerConstructor: constructorReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  feed: feedReducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
