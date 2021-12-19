import classes from './Button.module.css';

const Button = ({ text, clickHandler, evenMargin }) => {
  let evenMarginClass = `${evenMargin && 'buttonEvenMargin'}`;

  return (
    <button
      type='button'
      className={`${[classes.button, classes[evenMarginClass]].join(' ')}`}
      onClick={clickHandler}
    >
      {text}
    </button>
  );
};

export default Button;
