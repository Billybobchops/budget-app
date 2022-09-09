import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './category-slice';
import itemReducer from './items-slice';
import plannerReducer from './planner-slice';
import expenseReducer from './expenses-slice';
import fundReducer from './fund-slice';
import dateReducer from './date-slice';

const store = configureStore({
  reducer: {
    categories: categoryReducer,
		planner: plannerReducer,
    items: itemReducer,
    expenses: expenseReducer,
    funds: fundReducer,
    date: dateReducer,
  },
});

export default store;
