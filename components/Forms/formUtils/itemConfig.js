import { createFormFieldConfig } from './baseFormConfig';
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
} from './inputValidationRules';
import dummyData from '../../../store/dummyData';

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

const titles = dummyData.dummyPaychecks;

itemConfig['plannedPaycheck'] = {
  ...createFormFieldConfig(
    'plannedPaycheck', // label / id
    'Which planned paycheck handles this expense?', // name
    'dropdown', // type
    'I will set this up in the Planner later.', // default value
    null, // placeholder
    '',
    [{ title: 'I will set this up in the Planner later.' }, ...titles]
  ),
};