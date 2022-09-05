import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { addFund, getFunds } from '../firebase/sinkingFunds';

const fundsAdapter = createEntityAdapter();

const initialState = fundsAdapter.getInitialState({
  status: 'idle',
});

export const fetchFunds = createAsyncThunk('funds/fetchfunds', async (uid) => {
  try {
    const response = await getFunds(uid);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const addNewFund = createAsyncThunk(
  'funds/addNewFund',
  async ({ uid, formData }) => {
    try {
      const response = await addFund(uid, formData);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

const fundSlice = createSlice({
  name: 'funds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFunds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFunds.fulfilled, (state, action) => {
        fundsAdapter.setAll(state, action.payload);
        state.status = 'idle';
      })
      .addCase(addNewFund.fulfilled, fundsAdapter.addOne);
  },
});

// export const { calcTotalFund } = fundSlice.actions;

export const selectFundEntities = (state) => state.funds.entities;

export default fundSlice.reducer;
