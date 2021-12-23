import { createFormFieldConfig } from './baseFormConfig';
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
} from './inputValidationRules';
import dummyData from '../../../store/dummyData';

// dynamically render dropdown options from data received from firestore DB
const plannedPaychecks = () => {
  const titles = [];
  dummyData.dummyPaychecks.forEach((paycheck) => {
    titles.push(paycheck.title);
  });

  return titles;
};
const titles = plannedPaychecks();

// formObj we pass into useForm() hook
export const itemConfig = {};

// dynamically create add radio buttons from data received from firestore DB
// to config obj (move this fn to a helpers.js file?)
const radios = (radioLabels, groupName) => {
  radioLabels.forEach((radioLabel) => {
    itemConfig[`${radioLabel}`] = {
      ...createFormFieldConfig(
        radioLabel, // label
        groupName, // name
        'radio' // type
      ),
      validationRules: [requiredRule(`${groupName}`)],
    };
  });
};

radios(dummyData.categories, 'category select');

// add input objs individually to control their order in form obj
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