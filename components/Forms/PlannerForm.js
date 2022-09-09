import { useRef, useEffect, useContext, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import store from '../../store';
import { addNewIncome } from '../../store/items-slice';
import useForm from '../../hooks/useForm';
import classes from '../Forms/FormUI/FormStyles.module.css';
import FormBackground from './FormUI/FormBackground';
import FormContext from '../../store/form-context';
import SubmitButton from './FormUI/SubmitButton';
import { plannerConfig } from './formUtils/plannerConfig';
import { generateMonthYear } from '../../utils/helpers';

const PlannerForm = (props) => {
  const { renderFormInputs, isFormValid, form } = useForm(plannerConfig);
  const {
    user: { uid },
  } = useAuth();
  const formRef = useRef();
  const { onkeydown } = useContext(FormContext);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      id: form.title.value.trim(),
      nickname: form.nickname.value.trim(),
      expectedPay: +form.expectedPay.value,
      createdOn: new Date().toLocaleDateString(),
      createdOnMonthYear: generateMonthYear(),
    };
    store.dispatch(addNewIncome({ uid, formData }));
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
        <h1 className={classes.header}>Add New Planned Income</h1>
        {renderFormInputs()}
        <SubmitButton value='Submit' disabled={!isFormValid()} />
      </FormBackground>
    </form>
  );
};

export default PlannerForm;
