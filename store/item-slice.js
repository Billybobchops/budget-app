import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { getAllItems } from '../firebase/items';

const itemsAdapter = createEntityAdapter();

const initialState = itemsAdapter.getInitialState({
  status: 'idle',
});

export const fetchItems = createAsyncThunk('items/fetchItems', async (uid) => {
  try {
    const response = await getAllItems(uid);
    return response;
  } catch (error) {
    console.log(error);
  }
});

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        itemsAdapter.setAll(state, action.payload);
        state.status = 'idle';
      });
  },
});

// export const { increment, decrement } = itemSlice.actions;

export default itemSlice.reducer;
