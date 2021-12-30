import { createFormFieldConfig } from './baseFormConfig';
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
} from './inputValidationRules';

// This is the formObj we pass into useForm() hook
export const fundConfig = {
  title: {
    ...createFormFieldConfig(
      'I want to save up for...', // label
      'title', // name
      'text', // type
      '', // default value
      'A new car!' // placeholder
    ),
    validationRules: [
      requiredRule('Title'),
    ],
  },
  timePeriod: {
    ...createFormFieldConfig(
      'Over a period of', // label
      'timePeriod ', // name
      'number', // type
      '', // default value
      '12' // placeholder
    ),
    validationRules: [
      requiredRule('Time Period'),
    ],
  },
  timeType: {
    ...createFormFieldConfig(
      'timeType', // label
      'Period', // name
      'dropdown', // type
      'Months', // default value
      'Months', // placeholder
      '',
      ['Months', 'Years']
    ),
  },
  totalAmount: {
    ...createFormFieldConfig(
      'The total amount is', // label
      'totalAmount ', // name
      'number', // type
      '', // default value
      '$0.00' // placeholder
    ),
    validationRules: [
      requiredRule('Total Amount'),
    ],
  },
};
