import { useRef, useEffect, useContext } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { addItem } from '../../firebase/items';
import useForm from '../../hooks/useForm';
import FormContext from '../../store/form-context';
import { itemConfig } from './formUtils/itemConfig';
import classes from '../Forms/FormUI/FormStyles.module.css';
import FormBackground from './FormUI/FormBackground';
import SubmitButton from './FormUI/SubmitButton';

const ItemForm = (props) => {
  const { renderFormInputs, isFormValid, form, selectedOption } =
    useForm(itemConfig);
  const {
    user: { uid },
  } = useAuth();
  const formRef = useRef();
  const { onkeydown } = useContext(FormContext);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      category: selectedOption,
      title: form.title.value,
      budgetAmount: +form.budgetAmount.value,
      billDate: form.billDate.value,
      plannedPaycheck: form.plannedPaycheck.value,
    };

    addItem(uid, formData);
    onkeydown();
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
    <form onSubmit={submitHandler} ref={formRef}>
      <FormBackground>
        <h1 className={classes.header}>Add a New Budget Item</h1>
        {renderFormInputs()}
        <SubmitButton value='Submit' disabled={!isFormValid()} />
      </FormBackground>
    </form>
  );
};

export default ItemForm;
