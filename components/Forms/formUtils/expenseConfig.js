import { createFormFieldConfig } from './baseFormConfig';
import { requiredRule, minLengthRule } from './inputValidationRules';
import { radioYes, radioNo } from './conditions';

import dummyData from '../../../store/dummyData';

const budgetItems = dummyData.budgetItems.map((item) => {
  return {
    value: item.title,
    label: item.title,
  };
});

const categories = dummyData.categories.map((category) => {
  return {
    value: category,
    label: category,
  };
});

export const expenseConfig = {
  budgetItemQuestion: {
    ...createFormFieldConfig({
      label: 'budgetItemQuestion',
      name: 'Is this a budget item currently?',
      type: 'label',
      defaultValue: '',
    }),
  },
  yes: {
    ...createFormFieldConfig({
      label: 'yes',
      name: 'Is this a budget item currently?',
      type: 'radio',
      defaultValue: 'yes',
    }),
    validationRules: [requiredRule('Question')],
  },
  no: {
    ...createFormFieldConfig({
      label: 'no',
      name: 'Is this a budget item currently?',
      type: 'radio',
      defaultValue: 'no',
    }),
    validationRules: [requiredRule('Question')],
  },

  currentItemSearch: {
    ...createFormFieldConfig({
      label: 'Search current budget items',
      type: 'search',
      placeholder: 'Select budget item...',
      options: budgetItems,
    }),
    conditions: [radioYes()],
  },
  title: {
    ...createFormFieldConfig({
      label: 'Title',
      name: 'title',
      type: 'text',
      defaultValue: '',
      placeholder: 'Gas',
    }),
    conditions: [radioNo()],
  },
  categorySearch: {
    ...createFormFieldConfig({
      label: 'What category is this expense?',
      name: 'categorySearch',
      type: 'asyncCreatable',
      placeholder: 'Select category or create new...',
      options: categories,
    }),
    conditions: [radioNo()],
  },

  amount: {
    ...createFormFieldConfig({
      label: 'Amount Spent',
      name: 'amount',
      type: 'number',
      defaultValue: '',
      placeholder: '$0.00',
    }),
    validationRules: [requiredRule('Amount'), minLengthRule('Amount', 1)],
  },
  date: {
    ...createFormFieldConfig({
      label: 'Date',
      name: 'date',
      type: 'date',
      defaultValue: '',
      placeholder: '',
    }),
    validationRules: [requiredRule('Bill Date')],
  },
};
