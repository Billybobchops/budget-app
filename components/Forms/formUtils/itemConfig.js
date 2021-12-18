import { createFormFieldConfig } from './baseFormConfig';
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
} from './inputValidationRules';
import dummyData from '../../../store/dummyData';

////////////////////////////////////////////////
// create a function to dynamically render radio buttons
// from data received from firestore DB
// this data is the category titles
////////////////////////////////////////////////

////////////////////////////////////////////////
// create a function to dynamically render dropdown options
// from data received from firestore DB
// this data is the planned paychecks
////////////////////////////////////////////////

// This is the formObj we pass into useForm() hook
export const itemConfig = {
  needs: {
    ...createFormFieldConfig(
      'Needs', // label - currently hard coded
      'category', // name
      'radio', // type
      'Needs' // default value - currently hard coded
    ),
  },
  saving: {
    ...createFormFieldConfig(
      'Saving', // label - currently hard coded
      'category', // name
      'radio', // type
      'Saving' // default value - currently hard coded
    ),
  },
  giving: {
    ...createFormFieldConfig(
      'Giving', // label - currently hard coded
      'category', // name
      'radio', // type
      'Giving' // default value - currently hard coded
    ),
  },
  categoryBtn: {
    ...createFormFieldConfig(
      'Add New Budget Category', // label - currently hard coded
      '', // name
      'button', // type
      '' // default value - currently hard coded
    ),
  },
  break: {
    ...createFormFieldConfig(
      null, // label
      null, // name
      'break' // type
    ),
  },
  title: {
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
  },
  budgetAmount: {
    ...createFormFieldConfig(
      'Budget Amount', // label
      'budget amount', // name
      'number', // type
      '', // default value
      '$0.00' // placeholder
    ),
    validationRules: [
      requiredRule('Budget Amount'),
      minLengthRule('Budget Amount', 10),
      maxLengthRule('Budget Amount', 25),
    ],
  },
  billDate: {
    ...createFormFieldConfig(
      'When does this get billed?', // label
      'bill date', // name
      'date', // type
      '', // default value
      '' // placeholder
    ),
    validationRules: [
      requiredRule('Bill Date'),
      minLengthRule('Bill Date', 10),
      maxLengthRule('Bill Date', 25),
    ],
  },
  // DROPDOWN INPUT
  plannedPaycheck: {
    ...createFormFieldConfig(
      'Which planned paycheck handles this expense?', // label
      'planned paycheck', // name
      'dropdown', // type
      '', // default value
      'Select from dropdown', // placeholder
      [ // dropdown options array
        'I will set this up in the Planner later.',
        'Planned Paycheck 1',
        'Planned Paycheck 2',
      ]
    ),
  },
};

// Which planned paycheck handles this expense?
