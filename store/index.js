import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './item-slice';

const store = configureStore({
  reducer: { items: itemReducer },
});

export default store;
