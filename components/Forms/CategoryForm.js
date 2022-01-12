import { useRef, useEffect, useContext } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { addCategory } from '../../firebase/categories';
import { categoryConfig } from './formUtils/categoryConfig';
import useForm from '../../hooks/useForm';
import FormContext from '../../store/form-context';
import classes from '../Forms/FormUI/FormStyles.module.css';
import FormBackground from './FormUI/FormBackground';
import SubmitButton from './FormUI/SubmitButton';

const CategoryForm = (props) => {
  const { renderFormInputs, isFormValid, form } = useForm(categoryConfig);
  const {
    user: { uid },
  } = useAuth();
  const formRef = useRef();
  const { onkeydown } = useContext(FormContext);

  const submitHandler = (e) => {
    e.preventDefault();
    const category = form.category.value;

    addCategory(category, uid);
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
        <h1 className={classes.header}>Add a New Budget Category</h1>
        {renderFormInputs()}
        <SubmitButton value='Submit' disabled={!isFormValid()} />
      </FormBackground>
    </form>
  );
};

export default CategoryForm;
