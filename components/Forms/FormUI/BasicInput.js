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
  } = props;

  const inputRadio = `${type === 'radio' && 'inputRadio'}`;
  const inputError = `${errorMessage && !isValid && 'errorInput'}`;

  return (
    <>
      {type !== 'radio' && (
        <label className={classes.label} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className={`${[
          classes.input,
          classes[inputRadio],
          classes[inputError],
        ].join(' ')}`}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      ></input>
      {type === 'radio' && (
        <label className={classes.label} htmlFor={id}>
          {label}
        </label>
      )}
      {errorMessage && !isValid && (
        <span className={classes.errorMessage}>{errorMessage}</span>
      )}
    </>
  );
};

export default BasicInput;
