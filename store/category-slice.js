import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { addCategory, getAllCategories } from '../firebase/categories';

const categoriesAdapter = createEntityAdapter();

const initialState = categoriesAdapter.getInitialState({
  status: 'idle',
});

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (uid) => {
    try {
      const response = await getAllCategories(uid);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addNewCategory = createAsyncThunk(
  'categories/addNewCategory',
  async ({ uid, formData }) => {
    const response = await addCategory(uid, formData);
    return response;
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        categoriesAdapter.setAll(state, action.payload);
        state.status = 'idle';
      })
      .addCase(addNewCategory.fulfilled, categoriesAdapter.addOne);
  },
});

// export const { removeCategory } = categorySlice.actions;

export default categorySlice.reducer;
