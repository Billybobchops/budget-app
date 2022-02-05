import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './item-slice';
import categoryReducer from './category-slice';
import plannerReducer from './planner-slice';

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    items: itemReducer,
    planner: plannerReducer,
  },
});

export default store;
