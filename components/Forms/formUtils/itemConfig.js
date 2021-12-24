import { createFormFieldConfig } from './baseFormConfig';
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
} from './inputValidationRules';
import dummyData from '../../../store/dummyData';

// dynamically create/add dropdown options from data received from firestore DB
// to the config obj (move this fn to a helpers.js file?)
// const dropdowns = (inputLabel, dropdownOptions) => {
//   dropdownOptions.forEach((option) => {
//     itemConfig[`$${inputLabel}`] = {
//       ...createFormFieldConfig(
//         radioLabel, // label
//         groupName, // name
//         'radio', // type
//         radioLabel // defaultValue
//       ),
//       validationRules: [requiredRule(`${groupName}`)],
//     };
//   });
// };

// dropdowns('plannedPaycheck', dummyData.dummyPaychecks);

const titles = dummyData.dummyPaychecks;

// formObj we pass into useForm() hook
export const itemConfig = {};

// dynamically create/add radio buttons from data (array) received from firestore DB
// to the config obj (move this fn to a helpers.js file?)
const radios = (groupName, radioLabels) => {
  radioLabels.forEach((radioLabel) => {
    itemConfig[`${radioLabel}`] = {
      ...createFormFieldConfig(
        radioLabel, // label
        groupName, // name
        'radio', // type
        radioLabel // defaultValue
      ),
      validationRules: [requiredRule(`${groupName}`)],
    };
  });
};

radios('category select', dummyData.categories);

// add input objs individually to control their order in form obj (i.e. after radio btns)
itemConfig['categoryBtn'] = {
  ...createFormFieldConfig(
    'Add New Budget Category', // label
    'categoryBtn', // name
    'button', // type
    ''
  ),
};

itemConfig['title'] = {
  ...createFormFieldConfig(
    'Title', // label
    'title', // name
    'text', // type
    '', // default value
    'Example: Groceries' // placeholder
  ),
  validationRules: [
    requiredRule('Title'),
    minLengthRule('Title', 10),
    maxLengthRule('Title', 25),
  ],
};

itemConfig['budgetAmount'] = {
  ...createFormFieldConfig(
    'Budget Amount', // label
    'budgetAmount', // name
    'number', // type
    '', // default value
    '$0.00' // placeholder
  ),
  validationRules: [requiredRule('Budget Amount')],
};

itemConfig['billDate'] = {
  ...createFormFieldConfig(
    'When does this typically get billed?', // label
    'billDate', // name
    'date', // type
    '', // default value
    '' // placeholder
  ),
  validationRules: [
    requiredRule('Bill Date'),
    minLengthRule('Bill Date', 10),
    maxLengthRule('Bill Date', 25),
  ],
};

itemConfig['plannedPaycheck'] = {
  ...createFormFieldConfig(
    'Which planned paycheck handles this expense?', // label
    'plannedPaycheck', // name
    'dropdown', // type
    '', // default value
    'Select from dropdown', // placeholder
    '',
    [{ title: 'I will set this up in the Planner later.' }, ...titles]
  ),
};

// DROPDOWN INPUT
// plannedPaycheck: {
//   ...createFormFieldConfig(
//     'Which planned paycheck handles this expense?', // label
//     'plannedPaycheck', // name
//     'dropdown', // type
//     '', // default value
//     'Select from dropdown', // placeholder
//     ['I will set this up in the Planner later.', ...titles]
//   ),
// },
