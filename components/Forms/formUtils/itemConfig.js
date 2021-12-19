import { createFormFieldConfig } from './baseFormConfig';
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
} from './inputValidationRules';
import dummyData from '../../../store/dummyData';

// dynamically render radio buttons from data received from firestore DB
const categories = () => {
  const categoriesArr = [];
  dummyData.categories.forEach((category) => {
    categoriesArr.push({
      [`${category}`]: {
        ...createFormFieldConfig(
          category, // label
          category, // name
          'radio' // type
        ),
      },
    });
  });

  return categoriesArr;
};

const categoriesRadioConfig = categories();
// console.log(categoriesRadioConfig);
const entries = Object.entries(...categoriesRadioConfig);
// console.log(...entries);

// dynamically render dropdown options from data received from firestore DB
const plannedPaychecks = () => {
  const titles = [];
  dummyData.dummyPaychecks.forEach((paycheck) => {
    titles.push(paycheck.title);
  });

  return titles;
};
const titles = plannedPaychecks();

// This is the formObj we pass into useForm() hook
export const itemConfig = {
  // ...categoriesRadioConfig,
  needs: {
    ...createFormFieldConfig(
      'Needs', // label - currently hard coded
      'category select', // name
      'radio', // type
      '' // default value - currently hard coded
    ),
  },
  wants: {
    ...createFormFieldConfig(
      'Wants', // label - currently hard coded
      'category select', // name
      'radio', // type
      '' // default value - currently hard coded
    ),
  },
  categoryBtn: {
    ...createFormFieldConfig(
      'Add New Budget Category', // label
      'categoryBtn', // name
      'button', // type
      ''
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
      'budgetAmount', // name
      'number', // type
      '', // default value
      '$0.00' // placeholder
    ),
    validationRules: [
      requiredRule('Budget Amount'),
    ],
  },
  billDate: {
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
  },
  // DROPDOWN INPUT
  plannedPaycheck: {
    ...createFormFieldConfig(
      'Which planned paycheck handles this expense?', // label
      'plannedPaycheck', // name
      'dropdown', // type
      '', // default value
      'Select from dropdown', // placeholder
      ['I will set this up in the Planner later.', ...titles]
    ),
  },
};
