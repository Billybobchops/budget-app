import { createFormFieldConfig } from './baseFormConfig';
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
} from './inputValidationRules';

// This is the formObj we pass into useForm() hook
export const incomeConfig = {
  yes: {
    ...createFormFieldConfig(
      'Yes', // label - currently hard coded
      'Is this a planned paycheck?', // name
      'radio', // type
      '' // default value - currently hard coded
    ),
  },
  no: {
    ...createFormFieldConfig(
      'No', // label - currently hard coded
      'Is this a planned paycheck?', // name
      'radio', // type
      '' // default value - currently hard coded
    ),
  },

  break: {
    ...createFormFieldConfig(
      null, // label
      null, // name
      'break' // type
    ),
  },
  title: {
    ...createFormFieldConfig(
      'Title', // label
      'title', // name
      'text', // type
      '', // default value
      'Paycheck 1' // placeholder
    ),
    validationRules: [
      requiredRule('Title'),
      minLengthRule('Title', 10),
      maxLengthRule('Title', 25),
    ],
  },
  nickname: {
    ...createFormFieldConfig(
      'Nickname', // label
      'nickname', // name
      'text', // type
      '', // default value
      "Bob's first paycheck" // placeholder
    ),
    validationRules: [requiredRule('Nickname'), maxLengthRule('Nickname', 25)],
  },
  amount: {
    ...createFormFieldConfig(
      'Amount', // label
      'amount', // name
      'number', // type
      '', // default value
      '$0.00' // placeholder
    ),
    validationRules: [
      requiredRule('Amount'),
      minLengthRule('Amount', 10),
      maxLengthRule('Amount', 25),
    ],
  },
  billDate: {
    ...createFormFieldConfig(
      'When did this get billed?', // label
      'bill date', // name
      'date', // type
      '', // default value
      '' // placeholder
    ),
    validationRules: [
      requiredRule('Bill Date'),
      minLengthRule('Bill Date', 10),
      maxLengthRule('Bill Date', 25),
    ],
  },
};
