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

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  try {
    const response = await getAllItems();
    // console.log('fetching items');
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
        console.log('pending running');
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        console.log('action.payload is...');
        console.log(action.payload); // data is here and in the correct shape...
        itemsAdapter.setAll(state, action.payload);
        state.status = 'idle';
      });
  },
});

// export const { increment, decrement } = itemSlice.actions;

export default itemSlice.reducer;
