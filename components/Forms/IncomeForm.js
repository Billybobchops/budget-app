import classes from '../Forms/FormUI/FormStyles.module.css';
import FormBackground from './FormUI/FormBackground';
import SubmitButton from './FormUI/SubmitButton';
import { incomeConfig } from'./formUtils/incomeConfig';
import useForm from '../../hooks/useForm';
import { useRef, useEffect } from 'react';
import Select from "../../components/Forms/FormUI/Select"

const IncomeForm = (props) => {
  const { renderFormInputs, isFormValid, form } = useForm(incomeConfig);
  const formRef = useRef();

  const testFunction = () => {
    console.log('Form submitted.');
    console.log(form);
  };

  const isPlannedPaycheck = !!form.yes.value;
  console.log(isPlannedPaycheck);

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
        <h1 className={classes.header}>Add New Income</h1>
        <label className={classes.label}>Is this a planned paycheck?</label>
        <label className={classes.miniLabel}>Planned income is set up in the planner view!</label>
        {renderFormInputs()}
        {/* {isPlannedPaycheck && <Select name={} id={} label={} dropdownOptions={}/>} */}
        <SubmitButton value='Submit' disabled={!isFormValid()} />
      </FormBackground>
    </form>
  );
};

export default IncomeForm;
