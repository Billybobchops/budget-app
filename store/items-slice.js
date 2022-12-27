import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import {
  addItem,
  getAllItems,
  updateItemPaycheckSelect,
  updateItemPaycheckSortIndex,
  updateCategoryItem,
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
      console.log('response');
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateItemPaycheckSelectDoc = createAsyncThunk(
  'items/updateItemPaycheckSelectDoc',
  async ({ uid, document, newLocation }) => {
    const response = await updateItemPaycheckSelect(uid, document, newLocation);
    return response;
  }
);

export const updateItemPaycheckSortIndexDoc = createAsyncThunk(
  'items/updateItemPaycheckSortIndexDoc',
  async ({ uid, document, newIndex }) => {
    const response = await updateItemPaycheckSortIndex(uid, document, newIndex);
    return response;
  }
);

export const updateCategoryItemDoc = createAsyncThunk(
  'items/updateCategoryItemDoc',
  async ({ uid, document, newCategory }) => {
    const response = await updateCategoryItem(uid, document, newCategory);
    return response;
  }
);

const itemsAdapter = createEntityAdapter();

const initialState = itemsAdapter.getInitialState({
  status: 'idle',
});

const itemPlannerSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    // reorderCategoryIds: (state, action) => {
    //   const { startId, newItemIds } = action.payload;
    //   state.totalBudgetedCategory[startId].itemIds = newItemIds;
    // },
    updateCategoryStart: (state, action) => {
      const { startId, startItemsIds, draggableId } = action.payload;
      state.totalBudgetedCategory[startId].itemIds = startItemsIds;
      state.totalBudgetedCategory[startId].budgeted -=
        state.items.entities[draggableId].budgetAmount;
    },
    updateCategoryEnd: (state, action) => {
      const { endId, endItemsIds, draggableId } = action.payload;
      state.totalBudgetedCategory[endId].itemIds = endItemsIds;
      state.items.entities[draggableId].category = endId;
      state.totalBudgetedCategory[endId].budgeted +=
        state.items.entities[draggableId].budgetAmount;
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
      .addCase(addNewItem.fulfilled, (state, action) => {
        itemsAdapter.addOne(state, action.payload);
      })
      .addCase(updateItemPaycheckSelectDoc.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateItemPaycheckSelectDoc.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(updateCategoryItemDoc.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCategoryItemDoc.fulfilled, (state) => {
        state.status = 'idle';
      });
  },
});

export const {
  reorderPlannerIds,
  // reorderCategoryIds,
  updatePlannerStart,
  updateCategoryStart,
  updatePlannerEnd,
  updateCategoryEnd,
} = itemPlannerSlice.actions;

export const selectItemIds = (state) => state.items.ids;

export const selectItemEntities = (state) => state.items.entities;

export const selectPaycheckStatus = (state) => state.items.status;

export default itemPlannerSlice.reducer;
