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
      'Category Title', // label
      'category', // name
      'text', // type
      '', // default value
      'Needs, wants, saving, etc.' // placeholder
    ),
    validationRules: [
      requiredRule('Category'),
      minLengthRule('Category', 10),
      maxLengthRule('Category', 25),
    ],
  },
};
