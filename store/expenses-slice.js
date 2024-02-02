import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit';
import { addExpense, getExpenses } from '../firebase/expenses';

const expensesAdapter = createEntityAdapter();

const initialState = expensesAdapter.getInitialState({
	status: 'idle',
});

export const fetchExpenses = createAsyncThunk(
	'expenses/fetchExpenses',
	async ({ uid, currentDate }) => {
		try {
			const response = await getExpenses(uid, currentDate);
			return response;
		} catch (error) {
			console.log(error);
		}
	}
);

export const addNewExpense = createAsyncThunk(
	'expenses/addNewExpense',
	async ({ uid, formData }) => {
		try {
			const response = await addExpense(uid, formData);
			return response;
		} catch (error) {
			console.log(error);
		}
	}
);

const expenseSlice = createSlice({
	name: 'expenses',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchExpenses.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchExpenses.fulfilled, (state, action) => {
				expensesAdapter.setAll(state, action.payload);
				state.status = 'idle';
			})
			.addCase(addNewExpense.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(addNewExpense.fulfilled, (state, action) => {
				expensesAdapter.addOne(state, action.payload);
				state.status = 'idle';
			});
	},
});

export const selectExpenseEntities = (state) => state.expenses.entities;

export default expenseSlice.reducer;
