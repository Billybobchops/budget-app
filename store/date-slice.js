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
const monthNum = monthNums[monthString.slice(0, 3)];

const initialState = {
  headerDate: `${monthString} ${day}, ${year}`,
  formattedFullDate: `${monthNum}/${day}/${year}`,
  formattedMonthYear: `${monthNum}/${year}`,
  monthNum,
  selectedMonthString: monthString,
  year,
  currentDate: `${monthNum}/${day}/${year}`,
  currentMonthString: monthString,
  isCurrentDate: true,
};

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setHeaderMonth: (state, action) => {
      state.headerDate = `${action.payload.monthLong}, ${state.year}`;
      state.formattedFullDate = `${action.payload.monthNum}/${day}/${state.year}`;
      state.selectedMonthString = `${action.payload.monthLong}`;
      state.monthNum = action.payload.monthNum;
      state.isCurrentDate = state.currentDate === state.formattedFullDate;
      state.formattedMonthYear = `${state.monthNum}/${state.year}`;
    },
    incrementYear: (state) => {
      state.year = state.year += 1;
      state.headerDate = `${state.selectedMonthString}, ${state.year}`;
      state.formattedFullDate = `${state.monthNum}/${day}/${state.year}`;
      state.isCurrentDate = state.currentDate === state.formattedFullDate;
      state.formattedMonthYear = `${state.monthNum}/${state.year}`;
    },
    decrementYear: (state) => {
      state.formattedMonthYear = `${state.monthNum}/${state.year}`;
      state.year = state.year -= 1;
      state.headerDate = `${state.selectedMonthString}, ${state.year}`;
      state.formattedFullDate = `${state.monthNum}/${day}/${state.year}`;
      state.isCurrentDate = state.currentDate === state.formattedFullDate;
    },
    setDateToToday: (state) => {
      state.formattedMonthYear = `${state.monthNum}/${state.year}`;
      state.headerDate = `${state.currentMonthString} ${day}, ${year}`;
      state.formattedFullDate = state.currentDate;
      state.selectedMonthString = state.currentMonthString;
      state.monthNum = monthNum;
      state.year = +state.currentDate.slice(-4);
      state.formattedMonthYear = `${state.monthNum}/${state.year}`;
      state.isCurrentDate = state.currentDate === state.formattedFullDate;
    },
  },
});

export const { setHeaderMonth, incrementYear, decrementYear, setDateToToday } =
  dateSlice.actions;

export const selectFormattedMonthYear = (state) => state.date.formattedMonthYear;

export default dateSlice.reducer;
