import { createFormFieldConfig } from './baseFormConfig';
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
} from './inputValidationRules';

// This is the formObj we pass into useForm() hook
export const fundConfig = {
  title: {
    ...createFormFieldConfig({
      label: 'I want to save up for...',
      name: 'title',
      type: 'text',
      defaultValue: '',
      placeholder: 'A new car!',
    }),
    validationRules: [requiredRule('Title')],
  },
  timePeriod: {
    ...createFormFieldConfig({
      label: 'Over a period of',
      name: 'timePeriod',
      type: 'number',
      placeholder: '12',
      layout: 'twoCol'
    }),
    validationRules: [requiredRule('Time Period')],
  },
  timeType: {
    ...createFormFieldConfig({
      label: 'timeType',
      name: 'Period',
      type: 'dropdown',
      defaultValue: 'Months',
      placeholder: 'Months',
      layout: 'twoColEnd',
      selectedOption: '',
      dropdownOptions: ['Months', 'Years'],
    }),
  },
  totalAmount: {
    ...createFormFieldConfig({
      label: 'The total amount is',
      name: 'totalAmount',
      type: 'number',
      defaultValue: '',
      placeholder: '$0.00',
    }),
    validationRules: [requiredRule('Total Amount')],
  },
};
