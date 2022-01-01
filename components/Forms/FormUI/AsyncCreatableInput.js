import { useState } from 'react';
import AsyncCreatable from 'react-select/creatable';
import classes from './AsyncCreatableInput.module.css';
import customStyles from '../formUtils/reactSelectStyles';

const AsyncCreatableInput = ({ label, placeholder, options }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const changeHandler = ({ value }) => {
    setSelectedOption(value);
    console.log(value);
  };

  return (
    <>
      <label className={classes.label}>{label}</label>
      <AsyncCreatable
        onChange={changeHandler}
        styles={customStyles}
        options={options}
        placeholder={placeholder}
      />
    </>
  );
};

export default AsyncCreatableInput;
