import classes from '../Forms/FormUI/FormStyles.module.css';
import FormBackground from './FormUI/FormBackground';
import SubmitButton from './FormUI/SubmitButton';
import { fundConfig } from './formUtils/fundConfig';
import useForm from '../../hooks/useForm';
import { useRef, useEffect } from 'react';

const FundForm = (props) => {
  const { renderFormInputs, isFormValid, form } = useForm(fundConfig);
  const formRef = useRef();

  const testFunction = (e) => {
    e.preventDefault();
    console.log(form);
  };

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
        <h1 className={classes.header}>Add New Sinking Fund</h1>
        {renderFormInputs()}
        <SubmitButton value='Submit' disabled={!isFormValid()} />
      </FormBackground>
    </form>
  );
};

export default FundForm;
