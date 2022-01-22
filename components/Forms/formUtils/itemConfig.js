import { createFormFieldConfig } from './baseFormConfig';
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
} from './inputValidationRules';
import { radioYes } from './conditions';

// formObj we pass into useForm() hook
export const itemConfig = {
  categorySelect: {
    ...createFormFieldConfig({
      label: 'What category should this belong to?',
      type: 'categorySelect', // custom
      name: 'categorySelect',
      placeholder: 'Select a category...',
    }),
    validationRules: [requiredRule('Category')],
  },
  categoryBtn: {
    ...createFormFieldConfig({
      label: 'Add New Budget Category',
      name: 'categoryBtn',
      type: 'button',
      defaultValue: '',
    }),
  },
  title: {
    ...createFormFieldConfig({
      label: 'Title',
      name: 'title',
      type: 'text',
      defaultValue: '',
      placeholder: 'Ex: Groceries',
      layout: 'twoCol',
    }),
    validationRules: [
      requiredRule('Title'),
      minLengthRule('Title', 2),
      maxLengthRule('Title', 25),
    ],
  },
  budgetAmount: {
    ...createFormFieldConfig({
      label: 'Budget Amount',
      name: 'budgetAmount',
      type: 'number',
      defaultValue: '',
      placeholder: '$0.00',
      layout: 'twoColEnd',
    }),
    validationRules: [requiredRule('Budget Amount')],
  },
  billDate: {
    ...createFormFieldConfig({
      label: 'What day of the month is this typically billed?',
      name: 'billDate',
      type: 'date',
      defaultValue: '',
      placeholder: '',
    }),
    validationRules: [requiredRule('Bill Date')],
  },
  plannedLabel: {
    ...createFormFieldConfig({
      label: 'Does a planned paycheck handle this item?',
      name: 'plannedLabel',
      type: 'label',
    }),
  },
  plannedMiniLabel: {
    ...createFormFieldConfig({
      label: 'Planned income is set up in the planner view!',
      name: 'plannedMiniLabel',
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
  paycheckSelect: {
    ...createFormFieldConfig({
      label: 'Which planned paycheck handles this item?',
      type: 'paycheckSelect',
      name: 'paycheckSelect',
      placeholder: "Select a paycheck...",
      // defaultValue: {
      //   id: 'paycheckSelect',
      //   value: "None - I'll do this in the planner later.",
      //   label: "None - I'll do this in the planner later.",
      // },
    }),
    validationRules: [requiredRule('Planned pay')],
    conditions: [radioYes()],
  },
};

// func that dynamically creates radio buttons from data (array) received from firestore DB
// to the config obj (move this fn to a helpers.js file?)

// const radios = (groupName, radioLabels) => {
//   radioLabels.forEach((radioLabel) => {
//     itemConfig[`${radioLabel}`] = {
//       ...createFormFieldConfig({
//         label: radioLabel,
//         name: groupName,
//         type: 'radio',
//         defaultValue: radioLabel,
//       }),
//       validationRules: [requiredRule(`${groupName}`)],
//     };
//   });
// };

// radios('category select', dummyData.categories);
