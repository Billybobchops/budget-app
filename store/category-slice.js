import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit';
import {
	addCategory,
	getAllCategories,
	updateCategory,
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

export const updateCategoryDoc = createAsyncThunk(
	'categories/updateCategory',
	async ({ uid, prevID, newID }) => {
		await updateCategory(uid, prevID, newID);
		return newID;
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
			.addCase(updateCategoryDoc.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updateCategoryDoc.fulfilled, (state, action) => {
				categoriesAdapter.updateOne(state, {
					// might need to updateMany here? (items associated with prevCategory)
					// that might be a separate action for separate slice though...
					id: action.payload,
					changes: action.payload,
				});
				state.status = 'idle';
			});
	},
});

export const selectCategoryEntities = (state) => state.categories.entities;
export const selectCategoryIds = (state) => state.categories.ids;

export default categorySlice.reducer;
