import classes from '../Forms/FormUI/FormStyles.module.css';
import FormBackground from './FormUI/FormBackground';
import SubmitButton from './FormUI/SubmitButton';
import useForm from '../../hooks/useForm';
import { itemConfig } from './formUtils/itemConfig';
import { useRef, useEffect } from 'react';

const ItemForm = (props) => {
  const { renderFormInputs, isFormValid, form, selectedOption } =
    useForm(itemConfig);
  const formRef = useRef();

  const testFunction = (e) => {
    e.preventDefault();
    console.log('Form submitted.');
    console.log(selectedOption);
    console.log(form.title.value);
    console.log(form.budgetAmount.value);
    console.log(form.billDate.value);
    console.log(form.plannedPaycheck.value);
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
        <h1 className={classes.header}>Add a New Budget Item</h1>
        <label className={classes.label}>
          What Category should this belong to?
        </label>
        {renderFormInputs()}
        <SubmitButton value='Submit' disabled={!isFormValid()} />
      </FormBackground>
    </form>
  );
};

export default ItemForm;
