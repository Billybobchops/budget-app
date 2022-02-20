import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { addExpense, getExpenses } from '../firebase/expenses';

const expensesAdapter = createEntityAdapter();

const initialState = expensesAdapter.getInitialState({
  status: 'idle',
  spentAmounts: {},
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

        Object.values(action.payload).map((expense) => {
          // initialize if it doesn't already exist
          if (state.spentAmounts[expense.title] === undefined) {
            state.spentAmounts[expense.title] = {
              id: expense.title,
              spent: expense.amount,
            };
            return;
          }
          // if it exists already, add additional spent amount to current spent amount
          if (state.spentAmounts[expense.title])
            state.spentAmounts[expense.title].spent += expense.amount;
        });
      })
      .addCase(addNewExpense.fulfilled, expensesAdapter.addOne);
  },
});

// export const { asdf } = expenseSlice.actions;

export default expenseSlice.reducer;
