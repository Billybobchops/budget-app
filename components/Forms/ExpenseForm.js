import { useRef, useEffect, useContext, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';
import { expenseConfig } from './formUtils/expenseConfig';
import FormContext from '../../store/form-context';
import classes from '../Forms/FormUI/FormStyles.module.css';
import FormBackground from './FormUI/FormBackground';
import SubmitButton from './FormUI/SubmitButton';
import store from '../../store';
import { addNewExpense } from '../../store/expenses-slice';
import { generateMonthYear } from '../../utils/helpers';
import { serverTimestamp } from 'firebase/firestore';

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
      id: serverTimestamp().toMillis(),
      title: isCurrentItem
        ? form.itemSelect.value.value
        : form.title.value.trim(),
      category: isCurrentItem ? form.itemSelect.value.category : null, // form.categorySelect.value.value
      expense: true,
      amount: +form.amount.value,
      billDate: form.date.value,
      createdOn: new Date().toLocaleDateString(),
      createdOnMonthYear: generateMonthYear(),
    };

    store.dispatch(addNewExpense({ uid, formData }));
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
