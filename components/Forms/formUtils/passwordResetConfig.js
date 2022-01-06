import { createFormFieldConfig } from './baseFormConfig';
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
} from './inputValidationRules';

export const passwordResetConfig = {
  email: {
    ...createFormFieldConfig({
      label: 'Email',
      name: 'email',
      type: 'email',
      defaultValue: '',
      placeholder: 'Enter your email address',
    }),
    validationRules: [
      requiredRule('Email'),
      minLengthRule('Email', 10),
      maxLengthRule('Email', 25),
      // emailRule("email"),
    ],
  },
};
