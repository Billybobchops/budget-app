import { useRef, useEffect, useContext, useState, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { addExpense } from '../../firebase/expenses';
import useForm from '../../hooks/useForm';
import { incomeConfig } from './formUtils/incomeConfig';
import FormContext from '../../store/form-context';
import classes from '../Forms/FormUI/FormStyles.module.css';
import FormBackground from './FormUI/FormBackground';
import SubmitButton from './FormUI/SubmitButton';

const IncomeForm = (props) => {
  const [dropdown, setDropdown] = useState(
    "I'll do this in the Planner later."
  );
  const { renderFormInputs, isFormValid, form, selectedOption } =
    useForm(incomeConfig);
  const {
    user: { uid },
  } = useAuth();
  const formRef = useRef();
  const { onkeydown } = useContext(FormContext);

  const isPlannedPaycheck = selectedOption === 'yes';

  const dropdownHandler = (e) => {
    setDropdown(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const pp = isPlannedPaycheck ? dropdown : null;
    console.log(pp); // this consistently logs the initial state of dropdown only.

    const formData = {
      title: form.title.value,
      nickname: form.nickname.value,
      amount: +form.amount.value,
      billDate: form.billDate.value,
      // plannedPaycheck:
    };
    console.log(formData);

    // addExpense(uid, formData);
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
        <h1 className={classes.header}>Add New Income</h1>
        {renderFormInputs()}
        <SubmitButton value='Submit' disabled={!isFormValid()} />
      </FormBackground>
    </form>
  );
};

export default IncomeForm;
