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
      steppable: true,
      placeholder: '12',
      layout: 'twoCol',
    }),
    validationRules: [requiredRule('Time Period')],
  },
  timeType: {
    ...createFormFieldConfig({
      label: '',
      name: 'timeType',
      type: 'search',
      placeholder: 'Months',
      layout: 'twoColEnd',
      notRequired: true,
      defaultValue: {
        id: 'timeType',
        value: 'Months',
        label: 'Months',
      },
      options: [
        {
          id: 'timeType',
          value: 'Months',
          label: 'Months',
        },
        {
          id: 'timeType',
          value: 'Years',
          label: 'Years',
        },
      ],
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
  billDate: {
    ...createFormFieldConfig({
      label: 'When will this be billed?',
      name: 'billDate',
      type: 'date',
      defaultValue: '',
      placeholder: '',
      notRequired: true,
    }),
    validationRules: [requiredRule('Bill Date')],
  },
};
