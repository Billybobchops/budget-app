import { useRef, useEffect, useContext, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { categoryConfig } from './formUtils/categoryConfig';
import useForm from '../../hooks/useForm';
import FormContext from '../../store/form-context';
import classes from './FormUI/FormStyles.module.css';
import FormBackground from './FormUI/FormBackground';
import SubmitButton from './FormUI/SubmitButton';
import store from '../../store';
import { addNewCategory } from '../../store/category-slice';
import { generateMonthYear } from '../../utils/helpers';

const CategoryForm = () => {
  const { renderFormInputs, isFormValid, form } = useForm(categoryConfig);
  const {
    user: { uid },
  } = useAuth();
  const formRef = useRef();
  const { onkeydown } = useContext(FormContext);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      id: form.category.value.trim(),
      createdOn: new Date().toLocaleDateString(),
      createdOnMonthYear: generateMonthYear(),
    };
    const { id: newCategory } = formData;
    store.dispatch(addNewCategory({ uid, formData }));
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
        <h1 className={classes.header}>Add a New Budget Category</h1>
        {renderFormInputs()}
        <SubmitButton value='Submit' disabled={!isFormValid()} />
      </FormBackground>
    </form>
  );
};

export default CategoryForm;
