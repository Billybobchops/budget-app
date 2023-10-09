import classes from './SearchInput.module.css';
import customStyles from '../formUtils/reactSelectStyles';
// import AsyncSelect from 'react-select/async';
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
        defaultOptions={true}
        options={options}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        styles={customStyles}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchInput;
