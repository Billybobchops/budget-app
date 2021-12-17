import classes from './Button.module.css';

const Button = ({ text, clickHandler }) => {
  return (
    <button type='button' className={classes.button} onClick={clickHandler}>
      {text}
    </button>
  );
};

export default Button;
