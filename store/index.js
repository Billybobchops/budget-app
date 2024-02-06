import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './category-slice';
import dateReducer from './date-slice';
import expenseReducer from './expenses-slice';
import fundReducer from './fund-slice';
import itemReducer from './items-slice';
import paycheckOrderReducer from './paycheckOrder-slice';
import plannerReducer from './planner-slice';

const store = configureStore({
	reducer: {
		categories: categoryReducer,
		date: dateReducer,
		expenses: expenseReducer,
		funds: fundReducer,
		items: itemReducer,
		paycheckOrder: paycheckOrderReducer,
		planner: plannerReducer,
	},
});

export default store;
