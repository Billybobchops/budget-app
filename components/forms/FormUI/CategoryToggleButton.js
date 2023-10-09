import classes from './CategoryToggleButton.module.css';
import { useContext } from 'react';
import FormContext from '../../../store/form-context';

const TinyButton = ({ text}) => {
  const { onShowCategoryClick } = useContext(FormContext);

  return (
    <button
      type='button'
      className={classes.button}
      onClick={onShowCategoryClick}
    >
      {text}
    </button>
  );
};

export default TinyButton;
