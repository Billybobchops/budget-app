import { createFormFieldConfig } from '../baseFormConfig';
import { requiredRule } from '../inputValidationRules';
import dummyData from '../../../../store/dummyData';

const searchItems = dummyData.budgetItems.map((item) => {
  return {
    value: item.title,
    label: item.title,
  };
});

export const expenseSearchConfig = {
  search: {
    ...createFormFieldConfig({
      label: '',
      name: '',
      type: 'react-select',
      defaultValue: '',
      placeholder: '',
    }),
    validationRules: [requiredRule('Amount')],
  },
};
