import { createFormFieldConfig } from './baseFormConfig';
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
} from './inputValidationRules';

// This is the formObj we pass into useForm() hook
export const plannerConfig = {
  title: {
    ...createFormFieldConfig({
      label: 'Title',
      name: 'title',
      type: 'text',
      defaultValue: '',
      placeholder: 'Example: Paycheck 1',
    }),
    validationRules: [requiredRule('Title')],
  },
  nickname: {
    ...createFormFieldConfig({
      label: 'Nickname',
      name: 'nickname',
      type: 'text',
      defaultValue: '',
      placeholder: "Bob's first paycheck",
      layout: 'twoCol',
    }),
    validationRules: [requiredRule('Nickname'), maxLengthRule('Nickname', 25)],
  },
  expectedPay: {
    ...createFormFieldConfig({
      label: 'Expected Gross Pay',
      name: 'expectedPay',
      type: 'number',
      defaultValue: '',
      placeholder: '$0.00',
      layout: 'twoColEnd',
    }),
    validationRules: [
      requiredRule('Amount'),
    ],
  },
};
