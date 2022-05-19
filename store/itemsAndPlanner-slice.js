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
      if (!response) return;
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
      console.log('response');
      console.log(response);
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

export const updatePlannerItemDoc = createAsyncThunk(
  'itemsAndPlanner/updateItemDoc',
  async ({ uid, document, newLocation }) => {
    const response = await updatePlannerItem(uid, document, newLocation);
    return response;
  }
);

const itemsAdapter = createEntityAdapter();

const paycheckAdapter = createEntityAdapter();

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
    reorderPlannerIds: (state, action) => {
      const { startId, newItemIds } = action.payload;
      state.totalBudgetedPlanner[startId].itemIds = newItemIds;
    },
    reorderCategoryIds: (state, action) => {
      const { startId, newItemIds } = action.payload;
      state.totalBudgetedCategory[startId].itemIds = newItemIds;
    },
    updatePlannerStart: (state, action) => {
      const { startId, startItemsIds, draggableId } = action.payload;
      state.totalBudgetedPlanner[startId].itemIds = startItemsIds;
      state.totalBudgetedPlanner[startId].budgeted -=
        state.items.entities[draggableId].budgetAmount;
    },
    updateCategoryStart: (state, action) => {
      const { startId, startItemsIds, draggableId } = action.payload;
      state.totalBudgetedCategory[startId].itemIds = startItemsIds;
      state.totalBudgetedCategory[startId].budgeted -=
        state.items.entities[draggableId].budgetAmount;
    },
    updatePlannerEnd: (state, action) => {
      const { endId, endItemsIds, draggableId } = action.payload;
      state.totalBudgetedPlanner[endId].itemIds = endItemsIds;
      state.items.entities[draggableId].paycheckSelect = endId;
      state.totalBudgetedPlanner[endId].budgeted +=
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
      .addCase(fetchPaychecks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPaychecks.fulfilled, (state, action) => {
        if (!paycheckAdapter || !action.payload) {
          console.log('fudge');
          state.status = 'noPaychecksAdded';
          // state.planner.entities['noPaychecksAdded'] = { empty: true };
          return;
        }

        if (paycheckAdapter && action.payload) {
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
        }
      })
      .addCase(addNewIncome.fulfilled, (state, action) => {
        paycheckAdapter.addOne(state.items, action.payload);
      })
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
              itemIds: [],
            };
          }
        });

        Object.values(action.payload).map((item) => {
          // may need to init the list here again too in case this promise resolves first?
          let currentCategory = item.category;

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
          }

          // Update each Category's itemIds array
          if (item.category === currentCategory) {
            state.totalBudgetedCategory[item.category].itemIds.push(item.id);
          }
        });
      })
      .addCase(addNewItem.fulfilled, (state, action) => {
        itemsAdapter.addOne(state.items, action.payload);
      })
      .addCase(updatePlannerItemDoc.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePlannerItemDoc.fulfilled, (state) => {
			state.status = 'idle';
      });
  },
});

export const {
  reorderPlannerIds,
  reorderCategoryIds,
  updatePlannerStart,
  updatePlannerEnd,
  createDroppableData,
} = itemPlannerSlice.actions;

export default itemPlannerSlice.reducer;
