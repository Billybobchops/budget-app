import classes from './RadioButton.module.css';

const RadioButton = (props) => {
  const { id, label, type, name, value, errorMessage, isValid, handleChange } =
    props;

  return (
    <>
      <div className={classes.inputRadio}>
        <label htmlFor={id}>
          <input
            className={classes.label}
            type='radio'
            id={id}
            value={value}
            onChange={handleChange}
            name={name}
          ></input>
          {label}
        </label>
      </div>
      {errorMessage && !isValid && (
        <span className={classes.errorMessage}>{errorMessage}</span>
      )}
    </>
  );
};

export default RadioButton;
