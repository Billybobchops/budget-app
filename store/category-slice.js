import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit';
import {
	addCategory,
	batchDeleteCategory,
	batchUpdateCategory,
	getAllCategories,
} from '../firebase/categories';

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

export const batchUpdateCategoryDoc = createAsyncThunk(
	'categories/batchUpdateCategoryDoc',
	async ({ uid, prevID, newID }) => {
		await batchUpdateCategory(uid, prevID, newID);
		return newID;
	}
);

export const batchDeleteCategoryDoc = createAsyncThunk(
	'categories/batchDeleteCategoryDoc',
	async ({ uid, categoryID }) => {
		await batchDeleteCategory(uid, categoryID);
		return categoryID;
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
			.addCase(addNewCategory.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(addNewCategory.fulfilled, (state, action) => {
				categoriesAdapter.addOne(state, action.payload);
				state.status = 'idle';
			})
			.addCase(batchUpdateCategoryDoc.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(batchUpdateCategoryDoc.fulfilled, (state, action) => {
				categoriesAdapter.updateOne(state, {
					id: action.payload,
					changes: action.payload,
				});
				state.status = 'idle';
			})
			.addCase(batchDeleteCategoryDoc.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(batchDeleteCategoryDoc.fulfilled, (state, action) => {
				categoriesAdapter.removeOne(state, action.payload);
				state.status = 'idle';
			});
	},
});

export const selectCategoryEntities = (state) => state.categories.entities;
export const selectCategoryIds = (state) => state.categories.ids;

export default categorySlice.reducer;
