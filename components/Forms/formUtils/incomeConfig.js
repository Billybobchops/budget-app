import { createFormFieldConfig } from './baseFormConfig';
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
} from './inputValidationRules';

// This is the formObj we pass into useForm() hook
export const incomeConfig = {
  // break: {
  //   ...createFormFieldConfig(
  //     null, // label
  //     null, // name
  //     'break' // type
  //   ),
  // },
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
      minLengthRule('Amount', 1),
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
  plannedLabel: {
    ...createFormFieldConfig(
      'plannedLabel',
      'Is this a planned paycheck?',
      'label'
    ),
  },
  plannedMiniLabel: {
    ...createFormFieldConfig(
      'plannedMiniLabel',
      'Planned income is set up in the planner view!',
      'miniLabel'
    ),
  },
  yes: {
    ...createFormFieldConfig(
      'yes', // label - currently hard coded
      'Is this a planned paycheck?', // name
      'radio', // type
      'yes' // default value - currently hard coded
    ),
    validationRules: [requiredRule('Question')],
  },
  no: {
    ...createFormFieldConfig(
      'no', // label - currently hard coded
      'Is this a planned paycheck?', // name
      'radio', // type
      'no' // default value - currently hard coded
    ),
    validationRules: [requiredRule('Question')],
  },
};
