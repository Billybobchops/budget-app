import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPaycheckOrder } from '../firebase/planner';

const initialState = {
  status: 'idle',
};

export const fetchPaycheckOrder = createAsyncThunk(
  'plannerOrder/fetchPaycheckOrder',
  async (uid) => {
    const response = await getPaycheckOrder(uid);
    return response;
  }
);

const paycheckOrderSlice = createSlice({
  name: 'plannerOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaycheckOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPaycheckOrder.fulfilled, (state, action) => {
				state.status = 'idle';
				state.order = action.payload;
			});
  },
});

export const selectPaycheckOrder = (state) => state.paycheckOrder.order;

export default paycheckOrderSlice.reducer;

