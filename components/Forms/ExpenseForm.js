import { useRef, useEffect } from 'react';
import { expenseConfig } from './formUtils/expenseConfig';
import useForm from '../../hooks/useForm';
import classes from '../Forms/FormUI/FormStyles.module.css';
import FormBackground from './FormUI/FormBackground';
import SubmitButton from './FormUI/SubmitButton';
import SearchInput from './FormUI/SearchInput';

const ExpenseForm = (props) => {
  const { renderFormInputs, isFormValid, form, selectedOption } =
    useForm(expenseConfig);
  const formRef = useRef();

  const testFunction = () => {
    console.log('Form submitted.');
    console.log(form);
  };
  
  const isCurrentBudgetIem = selectedOption === 'yes';
  

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
        {isCurrentBudgetIem && <SearchInput />}
        {/* {!isCurrentBudgetIem && } */}
        <SubmitButton value='Submit' disabled={!isFormValid()} />
      </FormBackground>
    </form>
  );
};

export default ExpenseForm;
