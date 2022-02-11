import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './item-slice';
import categoryReducer from './category-slice';
import expenseReducer from './expenses-slice';
import plannerReducer from './planner-slice';
import fundReducer from './fund-slice';
import dateReducer from './date-slice';

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    items: itemReducer,
    expenses: expenseReducer,
    planner: plannerReducer,
    funds: fundReducer,
    date: dateReducer,
  },
});

export default store;
