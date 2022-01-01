import classes from './BasicInput.module.css';

const BasicInput = (props) => {
  const {
    id,
    label,
    type,
    name,
    placeholder,
    value,
    errorMessage,
    isValid,
    handleChange,
    layout
  } = props;

  const inputError = `${errorMessage && !isValid && 'errorInput'}`;
  const columns = `${layout}`;

  return (
    <>
      <label className={classes.label} htmlFor={id}>
        {label}
      </label>

      <input
        className={`${[classes.input, classes[inputError], classes[columns]].join(' ')}`}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      ></input>

      {errorMessage && !isValid && (
        <span className={classes.errorMessage}>{errorMessage}</span>
      )}
    </>
  );
};

export default BasicInput;
