import { createFormFieldConfig } from './baseFormConfig';
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
} from './inputValidationRules';

// This is the formObj we pass into useForm() hook
export const plannerConfig = {
  title: {
    ...createFormFieldConfig(
      'Title', // label
      'title', // name
      'text', // type
      '', // default value
      'Example: Paycheck 1' // placeholder
    ),
    validationRules: [
      requiredRule('Title'),
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
  expectedPay: {
    ...createFormFieldConfig(
      'Expected Pay', // label
      'expectedPay ', // name
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
};
