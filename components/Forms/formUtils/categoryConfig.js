import { createFormFieldConfig } from './baseFormConfig';
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
} from './inputValidationRules';

// This is the formObj we pass into useForm() hook
export const categoryConfig = {
  category: {
    ...createFormFieldConfig(
      'Budget Category Title', // label
      'budget category', // name
      'text', // type
      '', // default value
      'Needs, wants, saving, etc.' // placeholder
    ),
    validationRules: [
      requiredRule('Email'),
      minLengthRule('Email', 10),
      maxLengthRule('Email', 25),
    ],
  },
};
