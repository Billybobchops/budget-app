import { createFormFieldConfig } from './baseFormConfig';
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
  emailRule,
} from './inputValidationRules';

// This is the formObj we pass into useForm() hook
export const signupConfig = {
  firstName: {
    ...createFormFieldConfig({
      label: 'First Name',
      name: 'firstName',
      type: 'text',
      defaultValue: '',
      placeholder: 'First',
      layout: 'twoCol',
    }),
    validationRules: [requiredRule('Field'), minLengthRule('Name', 2)],
  },
  lastName: {
    ...createFormFieldConfig({
      label: 'Last name',
      name: 'lastName',
      type: 'text',
      defaultValue: '',
      placeholder: 'Last',
      layout: 'twoColEnd',
    }),
    validationRules: [requiredRule('Field'), minLengthRule('Name', 2)],
  },
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
