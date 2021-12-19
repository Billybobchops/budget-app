import classes from './TinyButton.module.css';

const TinyButton = ({ text, clickHandler }) => {
  return (
    <button type='button' className={classes.button} onClick={clickHandler}>
      {text}
    </button>
  );
};

export default TinyButton;
