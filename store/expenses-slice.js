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
  async (uid) => {
    try {
      const response = await getExpenses(uid);
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
      .addCase(addNewExpense.fulfilled, expensesAdapter.addOne);
  },
});

// export const { asdf } = expenseSlice.actions;

export default expenseSlice.reducer;
