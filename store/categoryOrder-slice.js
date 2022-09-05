import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addOneToCategoryOrder,
  getCategoryOrder,
} from '../firebase/categories';

const initialState = {
  status: 'idle',
  order: [],
};

export const fetchCategoryOrder = createAsyncThunk(
  'categoryOrder/fetchCategoryOrder',
  async (uid) => {
    try {
      console.log('fetchCategoryOrder thunk running...');
      const response = await getCategoryOrder(uid);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addNewCategoryOrder = createAsyncThunk(
  'categoryOrder/addNewCategory',
  async ({ uid, newCategory }) => {
    const response = await addOneToCategoryOrder(uid, newCategory);
    return response;
  }
);

const categoryOrderSlice = createSlice({
  name: 'categoryOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoryOrder.fulfilled, (state, action) => {
        state.status = 'idle';
        state.order = action.payload;
      })
      .addCase(addNewCategoryOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewCategoryOrder.fulfilled, (state, action) => {
        state.status = 'idle';
        state.order = action.payload;
      });
  },
});

export const selectCategoryOrder = (state) => state.categoryOrder.order;

export default categoryOrderSlice.reducer;
