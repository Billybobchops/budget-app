import { useRef, useEffect } from 'react';
import { expenseConfig } from './formUtils/expenseConfig';
import useForm from '../../hooks/useForm';
import classes from '../Forms/FormUI/FormStyles.module.css';
import FormBackground from './FormUI/FormBackground';
import SubmitButton from './FormUI/SubmitButton';
import SearchInput from './FormUI/SearchInput';
import BasicInput from './FormUI/BasicInput';
import AsyncCreatableInput from './FormUI/AsyncCreatableInput';
import dummyData from '../../store/dummyData';

const ExpenseForm = (props) => {
  const { renderFormInputs, isFormValid, form, selectedOption } =
    useForm(expenseConfig);
  const formRef = useRef();

  const testFunction = (e) => {
    e.preventDefault();
    console.log('Form submitted.');
    console.log(form);
  };

  const searchItems = dummyData.budgetItems.map((item) => {
    return {
      value: item.title,
      label: item.title,
    };
  });

  const searchCategories = dummyData.categories.map((category) => {
    return {
      value: category,
      label: category,
    };
  });

  const isCurrentItem =
    selectedOption === 'yes' ? (
      <SearchInput
        options={searchItems}
        label={'Search current budget items'}
        placeholder={'Select budget item...'}
      />
    ) : (
      ''
    );

  const isNotCurrentItem =
    selectedOption === 'no' ? (
      <>
        <BasicInput label={'Title'} placeholder={'Gas'}/>
        <AsyncCreatableInput
          options={searchCategories}
          label={'What category is this expense?'}
          placeholder={'Select category or type new one...'}
        />
      </>
    ) : (
      ''
    );

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!formRef.current.contains(e.target)) {
        props.onOverlayClick();
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [props]);

  return (
    <form onSubmit={testFunction} ref={formRef}>
      <FormBackground>
        <h1 className={classes.header}>Add New Expense</h1>
        {renderFormInputs()}
        {isCurrentItem}
        {isNotCurrentItem}
        <SubmitButton value='Submit' disabled={!isFormValid()} />
      </FormBackground>
    </form>
  );
};

export default ExpenseForm;
