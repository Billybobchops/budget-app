import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { addItem, getAllItems, updateItem } from '../firebase/items';
import { addPlannedIncome, getPlannedIncome } from '../firebase/planner';

export const fetchItems = createAsyncThunk(
  'itemsAndPlanner/fetchItems',
  async (uid) => {
    try {
      const response = await getAllItems(uid);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchPaychecks = createAsyncThunk(
  'itemsAndPlanner/fetchPaychecks',
  async (uid) => {
    try {
      const response = await getPlannedIncome(uid);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addNewItem = createAsyncThunk(
  'itemsAndPlanner/addNewItem',
  async ({ uid, formData }) => {
    try {
      const response = await addItem(uid, formData);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addNewIncome = createAsyncThunk(
  'itemsAndPlanner/addNewIncome',
  async ({ uid, formData }) => {
    const response = await addPlannedIncome(uid, formData);
    return response;
  }
);

export const updateItemDoc = createAsyncThunk(
  'itemsAndPlanner/updateItemDoc',
  async ({ uid, document, newLocation }) => {
    const response = await updateItem(uid, document, newLocation);
    return response;
  }
);

const itemsAdapter = createEntityAdapter({
  selectId: (item) => item.id,
});

const paycheckAdapter = createEntityAdapter({
  selectId: (paycheck) => paycheck.id,
});

const itemPlannerSlice = createSlice({
  name: 'itemsAndPlanner',
  initialState: {
    status: 'idle',
    items: itemsAdapter.getInitialState(),
    planner: paycheckAdapter.getInitialState(),
    totalBudgetedCategory: {},
    totalBudgetedPlanner: {},
    totalExpectedPay: 0,
  },
  reducers: {
    reorderIds: (state, action) => {
      const { startId, newItemIds } = action.payload;
      state.totalBudgetedPlanner[startId].itemIds = newItemIds;
    },
    updateStart: (state, action) => {
      const { startId, startItemsIds, draggableId } = action.payload;
      state.totalBudgetedPlanner[startId].itemIds = startItemsIds;
      // logic for subtracting planner accordion total budgeted amount
      // when moving from one paycheck to another (or DragList to a paycheck!)
      state.totalBudgetedPlanner[startId].budgeted -=
        state.items.entities[draggableId].budgetAmount;
    },
    updateEnd: (state, action) => {
      const { endId, endItemsIds, draggableId } = action.payload;
      state.totalBudgetedPlanner[endId].itemIds = endItemsIds;
      state.items.entities[draggableId].paycheckSelect = endId;
      state.totalBudgetedPlanner[endId].budgeted +=
        state.items.entities[draggableId].budgetAmount;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaychecks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPaychecks.fulfilled, (state, action) => {
        paycheckAdapter.setAll(state.planner, action.payload);
        state.status = 'idle';

        // Initialize all paychecks
        let arr = [];
        Object.values(action.payload).map((check) => {
          arr.push(check.expectedPay);
          state.totalBudgetedPlanner[check.id] = {
            id: check.id,
            budgeted: 0,
            itemIds: [],
          };
        });

        // Initialize the ItemsDragList
        state.totalBudgetedPlanner['ItemsDragList'] = {
          id: 'ItemsDragList',
          budgeted: 0,
          itemIds: [],
        };

        // Calc totalExpectedPay
        state.totalExpectedPay = arr.reduce((acc, current) => {
          return acc + current;
        }, 0);
      })
      .addCase(addNewIncome.fulfilled, paycheckAdapter.addOne)
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        itemsAdapter.setAll(state.items, action.payload);
        state.status = 'idle';

        // Calc totalBudgeted amount for each Category
        Object.values(action.payload).map((item) => {
          if (state.totalBudgetedCategory[item.category] === undefined) {
            let currentCategory = item.category;
            let arr = [];

            Object.values(action.payload).map((item) => {
              if (item.category === currentCategory) {
                arr.push(item.budgetAmount);
              }
            });

            state.totalBudgetedCategory[currentCategory] = {
              id: item.category,
              budgeted: arr.reduce((acc, current) => {
                return acc + current;
              }),
            };
          }
        });

        Object.values(action.payload).map((item) => {
          // may need to init the list here again too in case this promise resolves first?

          // Update ItemsDragList's budgetedAmount and itemIds
          if (item.paycheckSelect === null) {
            state.totalBudgetedPlanner['ItemsDragList'].budgeted +=
              item.budgetAmount;
            state.totalBudgetedPlanner['ItemsDragList'].itemIds.push(item.id);
            // return;
          }

          // Update each Paycheck's budgetedAmount and itemIds
          if (state.totalBudgetedPlanner[item.paycheckSelect]) {
            state.totalBudgetedPlanner[item.paycheckSelect].budgeted +=
              item.budgetAmount;
            state.totalBudgetedPlanner[item.paycheckSelect].itemIds.push(
              item.id
            );
            // return;
          }
        });
      })
      .addCase(addNewItem.fulfilled, itemsAdapter.addOne)
      .addCase(updateItemDoc.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateItemDoc.fulfilled, (state) => {
        state.status = 'idle';
      });
  },
});

export const { reorderIds, updateStart, updateEnd, createDroppableData } =
  itemPlannerSlice.actions;

export default itemPlannerSlice.reducer;
