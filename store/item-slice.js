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
  reducers: {
    // calcSpent: (state, action) => {
    //   state.spentAmounts[action.payload.title] = {
    //     id: action.payload.title,
    //     spent: action.payload.spentAmount,
    //   };
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        itemsAdapter.setAll(state, action.payload);
        // have to combine item-slice with expenses-slice to get access to both states...
        // would we then to likely have to combine it with categories as well to calculate
        // for sure can't only do this client-side

        // map over state.items.entities (titles) and state.expenses.entities (title)?
        // & add to spentAmount obj like so...
        // spentAmount[title]: { id: title, spent: 55 }

        state.status = 'idle';
      })
      .addCase(addNewItem.fulfilled, itemsAdapter.addOne);
  },
});

export const { calcSpent } = itemSlice.actions;

export default itemSlice.reducer;
