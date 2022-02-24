import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { addFund, getFunds } from '../firebase/sinkingFunds';

const fundsAdapter = createEntityAdapter();

const initialState = fundsAdapter.getInitialState({
  status: 'idle',
  totalFundAmount: 0,
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

        let arr = [];
        Object.values(action.payload).map((fund) => {
          let months;
          if (fund.timeType === 'Year') months = fund.timePeriod * 12;
          if (fund.timeType === 'Month') months = fund.timePeriod;
          arr.push(+(fund.totalAmount / months).toFixed(2))
        });
        state.totalFundAmount = arr.reduce((acc, current) => {
          return acc + current;
        }, 0);

        state.status = 'idle';
      })
      .addCase(addNewFund.fulfilled, fundsAdapter.addOne);
  },
});

export const { calcTotalFund } = fundSlice.actions;

export default fundSlice.reducer;
