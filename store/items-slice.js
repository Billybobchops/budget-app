import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit';
import {
	addItem,
	deleteItem,
	getAllItems,
	updateItemsCategory,
	updateItem,
	updateItemPaycheckSelect,
} from '../firebase/items';

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

export const deleteItemDoc = createAsyncThunk(
	'items/deleteItemDoc',
	async ({ uid, documentId }) => {
		try {
			await deleteItem(uid, documentId);
			return documentId;
		} catch (error) {
			console.log(error);
		}
	}
);

export const updateItemPaycheckSelectDoc = createAsyncThunk(
	'items/updateItemPaycheckSelectDoc',
	async ({ uid, document, newLocation }) => {
		const response = await updateItemPaycheckSelect(
			uid,
			document,
			newLocation
		);
		return response;
	}
);

export const updateItemsCategoryDoc = createAsyncThunk(
	'items/updateItemsCategoryDoc',
	async ({ uid, document, newCategory }) => {
		const response = await updateItemsCategory(uid, document, newCategory);
		return response;
	}
);

export const updateItemDoc = createAsyncThunk(
	'items/updateItemDoc',
	async ({ uid, idToUpdate, newData }) => {
		const response = await updateItem(uid, idToUpdate, newData);
		return response;
	}
);

const itemsAdapter = createEntityAdapter();

const initialState = itemsAdapter.getInitialState({
	status: 'idle',
});

const itemSlice = createSlice({
	name: 'items',
	initialState,
	reducers: {
		deleteClientItems: (state, action) => {
			const categoryID = action.payload;
			
			Object.values(state.entities).map((item) => {
				if (item.category !== categoryID) {
					return;
				} else if (item.category === categoryID) {
					itemsAdapter.removeOne(state, item.id);
				}
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchItems.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchItems.fulfilled, (state, action) => {
				itemsAdapter.setAll(state, action.payload);
				state.status = 'idle';
			})
			.addCase(addNewItem.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(addNewItem.fulfilled, (state, action) => {
				itemsAdapter.addOne(state, action.payload);
				state.status = 'idle';
			})
			.addCase(deleteItemDoc.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(deleteItemDoc.fulfilled, (state, action) => {
				itemsAdapter.removeOne(state, action.payload);
				state.status = 'idle';
			})
			.addCase(updateItemPaycheckSelectDoc.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updateItemPaycheckSelectDoc.fulfilled, (state) => {
				state.status = 'idle';
			})
			.addCase(updateItemsCategoryDoc.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updateItemsCategoryDoc.fulfilled, (state, action) => {
				const { document, newCategory } = action.payload;
				state.entities[document].category = newCategory;
				state.status = 'idle';
			})
			.addCase(updateItemDoc.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updateItemDoc.fulfilled, (state, action) => {
				itemsAdapter.updateOne(state, {
					id: action.payload.idToUpdate,
					changes: action.payload.updatedData.data,
				});
				state.status = 'idle';
			});
	},
});

export const { deleteClientItems } = itemSlice.actions;
export const selectItemIds = (state) => state.items.ids;
export const selectItemEntities = (state) => state.items.entities;

export default itemSlice.reducer;
