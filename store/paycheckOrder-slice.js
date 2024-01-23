import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPaycheckOrder, updatePaycheckOrderDoc } from '../firebase/planner';

const initialState = {
	status: 'idle',
};

export const fetchPaycheckOrder = createAsyncThunk(
	'paycheckOrder/fetchPaycheckOrder',
	async (uid) => {
		const response = await getPaycheckOrder(uid);
		return response;
	}
);

export const updatePaycheckOrder = createAsyncThunk(
	'paycheckOrder/updatePaycheckOrder',
	async ({ uid, orderClone }) => {
		await updatePaycheckOrderDoc(uid, orderClone);
		return orderClone;
	}
);

const paycheckOrderSlice = createSlice({
	name: 'plannerOrder',
	initialState,
	reducers: {
		userReorderPaychecks: (state, action) => {
			state.order = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPaycheckOrder.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchPaycheckOrder.fulfilled, (state, action) => {
				state.status = 'idle';
				state.order = action.payload;
			})
			.addCase(updatePaycheckOrder.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updatePaycheckOrder.fulfilled, (state, action) => {
				console.log('action.payload', action.payload);
				state.order = action.payload;
				state.status = 'idle';
			});
	},
});

export const { userReorderPaychecks } = paycheckOrderSlice.actions;
export const selectPaycheckOrder = (state) => state.paycheckOrder.order;

export default paycheckOrderSlice.reducer;
