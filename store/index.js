import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './item-slice';
import categoryReducer from './category-slice';

const store = configureStore({
  reducer: { categories: categoryReducer, items: itemReducer },
});

export default store;
