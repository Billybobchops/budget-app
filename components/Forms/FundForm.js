import { useRef, useEffect, useContext, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import FormContext from '../../store/form-context';
import classes from '../Forms/FormUI/FormStyles.module.css';
import FormBackground from './FormUI/FormBackground';
import SubmitButton from './FormUI/SubmitButton';
import { fundConfig } from './formUtils/fundConfig';
import useForm from '../../hooks/useForm';
import store from '../../store';
import { addNewFund } from '../../store/fund-slice';
import { generateMonthYear } from '../../utils/helpers';

const FundForm = (props) => {
  const { renderFormInputs, isFormValid, form } = useForm(fundConfig);
  const {
    user: { uid },
  } = useAuth();
  const formRef = useRef();
  const { onkeydown } = useContext(FormContext);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      id: form.title.value.trim(),
      timePeriod: +form.timePeriod.value,
      timeType: form.timeType.value.value === 'Months' ? 'Month' : 'Year',
      totalAmount: +form.totalAmount.value,
      billDate: form.billDate.value === '' ? null : form.billDate.value,
      createdOn: new Date().toLocaleDateString(),
      createdOnMonthYear: generateMonthYear(),
    };
    store.dispatch(addNewFund({ uid, formData }));
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
        <h1 className={classes.header}>Add New Sinking Fund</h1>
        {renderFormInputs()}
        <SubmitButton value='Submit' disabled={!isFormValid()} />
      </FormBackground>
    </form>
  );
};

export default FundForm;
