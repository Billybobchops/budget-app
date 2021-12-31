import { createFormFieldConfig } from './baseFormConfig';
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
} from './inputValidationRules';
import dummyData from '../../../store/dummyData';

// formObj we pass into useForm() hook
export const itemConfig = {};

itemConfig['categoryLabel'] = {
  ...createFormFieldConfig(
    'categoryLabel',
    'What category should this belong to?',
    'label'
  ),
};

// dynamically create/add radio buttons from data (array) received from firestore DB
// to the config obj (move this fn to a helpers.js file?)
const radios = (groupName, radioLabels) => {
  radioLabels.forEach((radioLabel) => {
    itemConfig[`${radioLabel}`] = {
      ...createFormFieldConfig({
        label: radioLabel,
        name: groupName,
        type: 'radio',
        defaultValue: radioLabel,
      }),
      validationRules: [requiredRule(`${groupName}`)],
    };
  });
};

radios('category select', dummyData.categories);

// add input objs individually to control their order in form obj
itemConfig['categoryBtn'] = {
  ...createFormFieldConfig({
    label: 'Add New Budget Category',
    name: 'categoryBtn',
    type: 'button',
    defaultValue: '',
  }),
};

itemConfig['title'] = {
  ...createFormFieldConfig({
    label: 'Title',
    name: 'title',
    type: 'text',
    defaultValue: '',
    placeholder: 'Example: Groceries',
  }),
  validationRules: [
    requiredRule('Title'),
    minLengthRule('Title', 10),
    maxLengthRule('Title', 25),
  ],
};

itemConfig['budgetAmount'] = {
  ...createFormFieldConfig({
    label: 'Budget Amount',
    name: 'budgetAmount',
    type: 'number',
    defaultValue: '',
    placeholder: '$0.00',
  }),
  validationRules: [requiredRule('Budget Amount')],
};

itemConfig['billDate'] = {
  ...createFormFieldConfig({
    label: 'When does this typically get billed?',
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
};

const titles = dummyData.dummyPaychecks;

itemConfig['plannedPaycheck'] = {
  ...createFormFieldConfig({
    label: 'plannedPaycheck',
    name: 'Which planned paycheck handles this expense?',
    type: 'dropdown',
    defaultValue: 'I will set this up in the Planner later.',
    placeholder: null,
    selectedOption: '',
    dropdownOptions: [
      { title: 'I will set this up in the Planner later.' },
      ...titles,
    ],
  }),
};
