import { createFormFieldConfig } from './baseFormConfig';
import { requiredRule, minLengthRule } from './inputValidationRules';
import { radioYes, radioNo } from './conditions';

export const expenseConfig = {
  budgetItemQuestion: {
    ...createFormFieldConfig({
      label: 'Is this a budget item currently?',
      name: 'budgetItemQuestion',
      type: 'label',
      defaultValue: '',
      notRequired: true,
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
  warningLabel: {
    ...createFormFieldConfig({
      label:
        "*If this isn't an existing budget item already, it's better to create a budget item first, unless this a non-recurring, one-off expense.",
      name: 'warningLabel',
      type: 'warningLabel',
      defaultValue: '',
      notRequired: true,
    }),
    conditions: [radioNo()],
  },
  itemSelect: {
    ...createFormFieldConfig({
      label: 'Search current budget items',
      name: 'itemSelect',
      type: 'itemSelect',
      placeholder: 'Select a budget item...',
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
  // categorySelect: {
  //   ...createFormFieldConfig({
  //     label: 'What category should this belong to?',
  //     type: 'categorySelect', // custom
  //     name: 'categorySelect',
  //     placeholder: 'Select a category...',
  //   }),
  //   validationRules: [requiredRule('Category')],
  //   conditions: [radioNo()],
  // },
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
