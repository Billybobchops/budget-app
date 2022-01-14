import { useState } from 'react';
import classes from './SearchInput.module.css';
import customStyles from '../formUtils/reactSelectStyles';
import Select from 'react-select';

const SearchInput = ({ label, placeholder, options }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const changeHandler = ({ value }) => {
    setSelectedOption(value);
    console.log(value);
  };

  return (
    <>
      <label className={classes.label}>{label}</label>
      <Select
        onChange={changeHandler}
        styles={customStyles}
        options={options}
        placeholder={placeholder}
      />
    </>
  );
};

export default SearchInput;
