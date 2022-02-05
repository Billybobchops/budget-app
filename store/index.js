import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './item-slice';
import categoryReducer from './category-slice';
import plannerReducer from './planner-slice';
import fundReducer from './fund-slice';
import expenseReducer from './expenses-slice';

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    items: itemReducer,
    expenses: expenseReducer,
    planner: plannerReducer,
    funds: fundReducer,
  },
});

export default store;
