import { createFormFieldConfig } from './baseFormConfig';
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
} from './inputValidationRules';

// This is the formObj we pass into useForm() hook
export const incomeConfig = {
  title: {
    ...createFormFieldConfig({
      label: 'Title',
      name: 'title',
      type: 'text',
      defaultValue: '',
      placeholder: 'Paycheck 1',
    }),
    validationRules: [
      requiredRule('Title'),
      minLengthRule('Title', 10),
      maxLengthRule('Title', 25),
    ],
  },
  nickname: {
    ...createFormFieldConfig({
      label: 'Nickname',
      name: 'nickname',
      type: 'text',
      defaultValue: '',
      placeholder: "Bob's first paycheck",
    }),
    validationRules: [requiredRule('Nickname'), maxLengthRule('Nickname', 25)],
  },
  amount: {
    ...createFormFieldConfig({
      label: 'Amount',
      name: 'amount',
      type: 'number',
      defaultValue: '',
      placeholder: '$0.00',
    }),
    validationRules: [
      requiredRule('Amount'),
      minLengthRule('Amount', 1),
      maxLengthRule('Amount', 25),
    ],
  },
  billDate: {
    ...createFormFieldConfig({
      label: 'When did this get billed?',
      name: 'billDate',
      type: 'date',
    }),
    validationRules: [
      requiredRule('Bill Date'),
      minLengthRule('Bill Date', 10),
      maxLengthRule('Bill Date', 25),
    ],
  },
  plannedLabel: {
    ...createFormFieldConfig({
      label: 'plannedLabel',
      name: 'Is this a planned paycheck?',
      type: 'label',
    }),
  },
  plannedMiniLabel: {
    ...createFormFieldConfig({
      label: 'plannedMiniLabel',
      name: 'Planned income is set up in the planner view!',
      type: 'miniLabel',
    }),
  },
  yes: {
    ...createFormFieldConfig({
      label: 'yes',
      name: 'Is this a planned paycheck?',
      type: 'radio',
      defaultValue: 'yes',
    }),
    validationRules: [requiredRule('Question')],
  },
  no: {
    ...createFormFieldConfig({
      label: 'no',
      name: 'Is this a planned paycheck?',
      type: 'radio',
      defaultValue: 'no',
    }),
    validationRules: [requiredRule('Question')],
  },
};
