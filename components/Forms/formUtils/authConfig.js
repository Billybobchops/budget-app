import { createFormFieldConfig } from './baseFormConfig';
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
  emailRule,
} from './inputValidationRules';

// This is the formObj we pass into useForm() hook
export const authConfig = {
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
  password: {
    ...createFormFieldConfig({
      label: 'Password',
      name: 'password',
      type: 'password',
      defaultValue: '',
      placeholder: 'Enter your password',
    }),
    validationRules: [
      requiredRule('Password'),
      minLengthRule('Password', 8),
      maxLengthRule('Password', 35),
    ],
  },
};
