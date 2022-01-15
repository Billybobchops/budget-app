import AsyncCreatable from 'react-select/creatable';
import classes from './AsyncCreatableInput.module.css';
import customStyles from '../formUtils/reactSelectStyles';

const AsyncCreatableInput = ({
  id,
  label,
  name,
  placeholder,
  value,
  errorMessage,
  isValid,
  handleChange,
  options,
}) => {
  return (
    <>
      <label className={classes.label}>{label}</label>
      <AsyncCreatable
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        styles={customStyles}
        options={options}
        placeholder={placeholder}
      />
    </>
  );
};

export default AsyncCreatableInput;
