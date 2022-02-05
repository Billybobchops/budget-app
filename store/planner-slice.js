import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { addPlannedIncome, getPlannedIncome } from '../firebase/planner';

const paycheckAdapter = createEntityAdapter();

const initialState = paycheckAdapter.getInitialState({
  status: 'idle',
  totalExpectedPay: 0,
});

export const fetchPaychecks = createAsyncThunk(
  'planner/fetchPaychecks',
  async (uid) => {
    try {
      const response = await getPlannedIncome(uid);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addNewIncome = createAsyncThunk(
  'planner/addNewIncome',
  async ({ uid, formData }) => {
    const response = await addPlannedIncome(uid, formData);
    return response;
  }
);

const plannerSlice = createSlice({
  name: 'planner',
  initialState,
  reducers: {
    calcTotalPay: (state) => {
      console.log(state);
      let arr = [];
      Object.values(state.entities).map((check) =>
        arr.push(check.expectedPay)
      );
      state.totalExpectedPay = arr.reduce((acc, current) => {
        return acc + current;
      }, 0);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaychecks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPaychecks.fulfilled, (state, action) => {
        paycheckAdapter.setAll(state, action.payload);
        state.status = 'idle';
      })
      .addCase(addNewIncome.fulfilled, paycheckAdapter.addOne);
  },
});

export const { calcTotalPay } = plannerSlice.actions;

export default plannerSlice.reducer;
