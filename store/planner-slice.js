import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { addPlannedIncome, getPlannedIncome } from '../firebase/planner';

const paycheckAdapter = createEntityAdapter();

const initialState = paycheckAdapter.getInitialState({
  status: 'idle',
});

export const fetchPaychecks = createAsyncThunk(
  'planner/fetchPaychecks',
  async (uid) => {
    try {
      const response = await getPlannedIncome(uid);
      if (!response) return;
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaychecks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPaychecks.fulfilled, (state, action) => {
        if (!paycheckAdapter || !action.payload) {
          console.log('fudge');
          state.status = 'noPaychecksAdded';
          // state.planner.entities['noPaychecksAdded'] = { empty: true };
          return;
        }

        if (paycheckAdapter && action.payload) {
          paycheckAdapter.setAll(state, action.payload);
          state.status = 'idle';
        }
      })
			.addCase(addNewIncome.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewIncome.fulfilled, (state, action) => {
				paycheckAdapter.addOne(state, action.payload);
				state.status = 'idle';
      });
  },
});

// export const { reorderPlannerIds, updatePlannerStart, updatePlannerEnd } = plannerSlice.actions; // these were basic reducers exported as actions

export const selectPaycheckEntities = (state) => state.planner.entities;

export default plannerSlice.reducer;
