import classes from './RadioButtons.module.css';

const RadioButton = ({
  id,
  label,
  name,
  value,
  errorMessage,
  isValid,
  handleChange,
  checked,
}) => {
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
            checked={checked}
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
