import { createFormFieldConfig } from './baseFormConfig';
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
} from './inputValidationRules';

import dummyData from '../../../store/dummyData';

const categories = dummyData.categories.map((category) => {
  return {
    value: category,
    label: category,
  };
});

let paychecks = [
  {
    value: "I'll do this in the Planner later.",
    label: "I'll do this in the Planner later.",
  },
];

const addPaychecks = () => {
  dummyData.dummyPaychecks.map((check) => {
    paychecks.push({ value: check.title, label: check.title });
  });
};
addPaychecks();

// formObj we pass into useForm() hook
export const itemConfig = {
  categorySelect: {
    ...createFormFieldConfig({
      label: 'What category should this belong to?',
      type: 'search',
      name: 'categorySelect',
      placeholder: 'Select a category...',
      options: categories,
    }),
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
      placeholder: 'Example: Groceries',
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
    validationRules: [
      requiredRule('Bill Date'),
      minLengthRule('Bill Date', 10),
      maxLengthRule('Bill Date', 25),
    ],
  },
  plannedPaycheck: {
    ...createFormFieldConfig({
      label: 'Which planned paycheck handles this?',
      type: 'search',
      name: 'plannedPaycheck',
      placeholder: "None - I'll do this in the Planner later.",
      options: paychecks,
    }),
  },
};

// dynamically create/add radio buttons from data (array) received from firestore DB
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
