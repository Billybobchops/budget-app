import { createSlice } from '@reduxjs/toolkit';

const day = new Date().getDate();
const year = new Date().getFullYear();
const monthNums = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};
const monthString = new Date().toLocaleString('default', { month: 'long' });
const formattedMonth = monthNums[monthString.slice(0, 3)];

const initialState = {
  headerDate: `${monthString} ${day}, ${year}`,
  formattedDate: `${formattedMonth}/${day}/${year}`,
  formattedMonth,
  selectedMonthString: monthString,
  year,
  currentDate: `${formattedMonth}/${day}/${year}`,
  currentMonthString: monthString,
  isCurrentDate: true,
};

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setHeaderMonth: (state, action) => {
      state.headerDate = `${action.payload.monthLong}, ${state.year}`;
      state.formattedDate = `${action.payload.monthNum}/${day}/${state.year}`;
      state.selectedMonthString = `${action.payload.monthLong}`;
      state.formattedMonth = action.payload.monthNum;
      state.isCurrentDate = state.currentDate === state.formattedDate;
    },
    incrementYear: (state) => {
      state.year = state.year += 1;
      state.headerDate = `${state.selectedMonthString}, ${state.year}`;
      state.formattedDate = `${state.formattedMonth}/${day}/${state.year}`;
      state.isCurrentDate = state.currentDate === state.formattedDate;
    },
    decrementYear: (state) => {
      state.year = state.year -= 1;
      state.headerDate = `${state.selectedMonthString}, ${state.year}`;
      state.formattedDate = `${state.formattedMonth}/${day}/${state.year}`;
      state.isCurrentDate = state.currentDate === state.formattedDate;
    },
    setDateToToday: (state) => {
      state.headerDate = `${state.currentMonthString} ${day}, ${year}`;
      state.formattedDate = state.currentDate; 
      state.selectedMonthString = state.currentMonthString;
      state.formattedMonth = formattedMonth;
      state.year = +state.currentDate.slice(-4);
      state.isCurrentDate = state.currentDate === state.formattedDate;
    },
  },
});

export const { setHeaderMonth, incrementYear, decrementYear, setDateToToday } =
  dateSlice.actions;

export default dateSlice.reducer;
