import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './itemsAndPlanner-slice';
import categoryReducer from './category-slice';
import expenseReducer from './expenses-slice';
import fundReducer from './fund-slice';
import dateReducer from './date-slice';

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    itemsAndPlanner: itemReducer,
    expenses: expenseReducer,
    funds: fundReducer,
    date: dateReducer,
  },
});

export default store;
