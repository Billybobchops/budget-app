import { createFormFieldConfig } from './baseFormConfig';
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
} from './inputValidationRules';

// This is the formObj we pass into useForm() hook
export const categoryConfig = {
  category: {
    ...createFormFieldConfig({
      label: 'Category Title',
      name: 'category',
      type: 'text',
      defaultValue: '',
      placeholder: 'Needs, wants, saving, etc.',
    }),
    validationRules: [
      requiredRule('Category'),
      minLengthRule('Category', 2),
      maxLengthRule('Category', 25),
    ],
  },
};
