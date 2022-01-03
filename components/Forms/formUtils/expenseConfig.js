import { createFormFieldConfig } from './baseFormConfig';
import { requiredRule, minLengthRule } from './inputValidationRules';

export const expenseConfig = {
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
};


