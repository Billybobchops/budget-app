import classes from './BasicInput.module.css';

const BasicInput = ({
  id,
  label,
  type,
  name,
  placeholder,
  value,
  errorMessage,
  isValid,
  handleChange,
  layout,
  steppable,
}) => {
  const inputError = `${errorMessage && !isValid && 'errorInput'}`;
  const columns = `${layout}`;

  return (
    <div className={layout ? classes[columns] : ''}>
      <label className={classes.label} htmlFor={id}>
        {label}
      </label>

      {!steppable && (
        <input
          className={`${[classes.input, classes[inputError]].join(' ')}`}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        ></input>
      )}

      {steppable && (
        <input
          className={`${[classes.input, classes[inputError]].join(' ')}`}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          min='0'
          step='1'
        ></input>
      )}

      {/* {errorMessage && !isValid && (
        <span className={classes.errorMessage}>{errorMessage}</span>
      )} */}
    </div>
  );
};

export default BasicInput;
