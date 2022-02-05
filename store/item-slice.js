import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { addItem, getAllItems } from '../firebase/items';

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

export const addNewItem = createAsyncThunk(
  'items/addNewItem',
  async ({ uid, formData }) => {
    try {
      const response = await addItem(uid, formData);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

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
      })
      .addCase(addNewItem.fulfilled, itemsAdapter.addOne);
  },
});

// export const { removeItem } = itemSlice.actions;

export default itemSlice.reducer;
