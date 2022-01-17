import classes from './SearchInput.module.css';
import customStyles from '../formUtils/reactSelectStyles';
import AsyncSelect from 'react-select/async';
// import Select from 'react-select';

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

  // THIS MUST BE A FUNCTION NOT A RETURNED VALUE
  console.log(`options props is ${options}`); // undefined <--- this is THE issue

  return (
    <div className={layout ? classes[columns] : ''}>
      <label className={classes.label}>{label}</label>
      <AsyncSelect
        defaultOptions={true}
        loadOptions={options}
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
