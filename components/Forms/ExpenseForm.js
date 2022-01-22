import { useRef, useEffect, useContext, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { addExpense } from '../../firebase/expenses';
import useForm from '../../hooks/useForm';
import { expenseConfig } from './formUtils/expenseConfig';
import FormContext from '../../store/form-context';
import classes from '../Forms/FormUI/FormStyles.module.css';
import FormBackground from './FormUI/FormBackground';
import SubmitButton from './FormUI/SubmitButton';

const ExpenseForm = () => {
  const { renderFormInputs, isFormValid, form, selectedOption } =
    useForm(expenseConfig);
  const {
    user: { uid },
  } = useAuth();
  const formRef = useRef();
  const { onkeydown } = useContext(FormContext);

  const submitHandler = (e) => {
    e.preventDefault();
    const isCurrentItem = selectedOption === 'yes';

    const formData = {
      title: isCurrentItem ? form.itemSelect.value.value : form.title.value,
      itemSelect: isCurrentItem ? form.itemSelect.value.value : null, 
      category: isCurrentItem
        ? form.itemSelect.value.category
        : null, // form.categorySelect.value.value
      expense: true,
      amount: +form.amount.value,
      date: form.date.value,
    };

    addExpense(uid, formData);
    onkeydown();
  };

  const checkIfClickedOutside = useCallback(
    (e) => {
      if (!formRef.current.contains(e.target)) {
        onkeydown();
      }
    },
    [onkeydown]
  );

  useEffect(() => {
    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [checkIfClickedOutside]);

  return (
    <form onSubmit={submitHandler} ref={formRef}>
      <FormBackground>
        <h1 className={classes.header}>Add New Expense</h1>
        {renderFormInputs()}
        <SubmitButton value='Submit' disabled={!isFormValid()} />
      </FormBackground>
    </form>
  );
};

export default ExpenseForm;
