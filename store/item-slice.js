import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { addItem, getAllItems } from '../firebase/items';

const itemsAdapter = createEntityAdapter();

const initialState = itemsAdapter.getInitialState({
  status: 'idle',
  totalBudgeted: {},
  totalBudgetedPlanner: {},
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

        Object.values(action.payload).map((item) => {
          if (state.totalBudgeted[item.category] === undefined) {
            let currentCategory = item.category;
            let arr = [];

            Object.values(action.payload).map((item) => {
              if (item.category === currentCategory) {
                arr.push(item.budgetAmount);
              }
            });

            state.totalBudgeted[currentCategory] = {
              id: item.category,
              budgeted: arr.reduce((acc, current) => {
                return acc + current;
              }),
            };
            return;
          }
        });

        Object.values(action.payload).map((item) => {
          if (
            state.totalBudgetedPlanner[item.paycheckSelect] === undefined &&
            item.paycheckSelect !== null
          ) {
            state.totalBudgetedPlanner[item.paycheckSelect] = {
              id: item.paycheckSelect,
              budgeted: item.budgetAmount,
            };
            return;
          }

          if (state.totalBudgetedPlanner[item.paycheckSelect])
            state.totalBudgetedPlanner[item.paycheckSelect].budgeted +=
              item.budgetAmount;
        });
      })
      .addCase(addNewItem.fulfilled, itemsAdapter.addOne);
  },
});

export const { calcSpent } = itemSlice.actions;

export default itemSlice.reducer;
