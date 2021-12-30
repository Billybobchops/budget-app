import { useRef, useEffect } from 'react';
import { incomeConfig } from './formUtils/incomeConfig';
import useForm from '../../hooks/useForm';
import classes from '../Forms/FormUI/FormStyles.module.css';
import FormBackground from './FormUI/FormBackground';
import SubmitButton from './FormUI/SubmitButton';
import Select from '../../components/Forms/FormUI/Select';
import dummyData from '../../store/dummyData';

const IncomeForm = (props) => {
  const { renderFormInputs, isFormValid, form, selectedOption } =
    useForm(incomeConfig);
  const formRef = useRef();

  const titles = dummyData.dummyPaychecks;

  const testFunction = () => {
    console.log('Form submitted.');
    console.log(form);
  };

  const isPlannedPaycheck = selectedOption === 'yes';

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
        {renderFormInputs()}
        {isPlannedPaycheck && (
          <Select
            name='Which Paycheck is this?'
            id='plannedPaycheck'
            label='Which Paycheck is this?'
            dropdownOptions={titles}
          />
        )}
        <SubmitButton value='Submit' disabled={!isFormValid()} />
      </FormBackground>
    </form>
  );
};

export default IncomeForm;
