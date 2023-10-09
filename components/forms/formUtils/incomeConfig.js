import { createFormFieldConfig } from './baseFormConfig';
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
} from './inputValidationRules';
import { radioYes, radioNo } from './conditions';

// This is the formObj we pass into useForm() hook
export const incomeConfig = {
  plannedLabel: {
    ...createFormFieldConfig({
      label: 'Is this a planned paycheck?',
      name: 'plannedLabel',
      type: 'label',
      notRequired: true,
    }),
  },
  plannedMiniLabel: {
    ...createFormFieldConfig({
      label: 'Planned income is set up in the planner view!',
      name: 'plannedMiniLabel',
      type: 'miniLabel',
      notRequired: true,
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
  paycheckSelect: {
    ...createFormFieldConfig({
      label: 'Which planned paycheck is this?',
      name: 'paycheckSelect',
      type: 'paycheckSelect',
      placeholder: 'Select a paycheck...',
    }),
    validationRules: [requiredRule('Planned pay')],
    conditions: [radioYes()],
  },
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
    conditions: [radioNo()],
  },
  nickname: {
    ...createFormFieldConfig({
      label: 'Nickname',
      name: 'nickname',
      type: 'text',
      defaultValue: '',
      placeholder: "Bob's first paycheck",
      notRequired: true,
    }),
  },
  amount: {
    ...createFormFieldConfig({
      label: 'Amount',
      name: 'amount',
      type: 'number',
      defaultValue: '',
      placeholder: '$0.00',
      layout: 'twoCol',
    }),
    validationRules: [
      requiredRule('Amount'),
      minLengthRule('Amount', 1),
      maxLengthRule('Amount', 25),
    ],
  },
  billDate: {
    ...createFormFieldConfig({
      label: 'When did you receive this?',
      name: 'billDate',
      type: 'date',
      layout: 'twoColEnd',
    }),
    validationRules: [
      requiredRule('Bill Date'),
      minLengthRule('Bill Date', 10),
      maxLengthRule('Bill Date', 25),
    ],
  },
};
