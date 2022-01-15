// import { useState } from 'react';
import classes from './SearchInput.module.css';
import customStyles from '../formUtils/reactSelectStyles';
import Select from 'react-select';

const SearchInput = ({
  id,
  label,
  name,
  placeholder,
  value,
  errorMessage,
  isValid,
  handleChange,
  options,
  layout,
}) => {
  const columns = `${layout}`;

  return (
    <div className={layout ? classes[columns] : ''}>
      <label className={classes.label}>{label}</label>
      <Select
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        styles={customStyles}
        options={options}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchInput;
