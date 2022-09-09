// custom paycheck dropdown
import { useSelector } from 'react-redux';
import classes from './SearchInput.module.css';
import customStyles from '../formUtils/reactSelectStyles';
import Select from 'react-select';

const PaycheckSelect = ({
  id,
  label,
  name,
  placeholder,
  value,
  errorMessage,
  isValid,
  handleChange,
  layout,
}) => {
  const columns = `${layout}`;

  const paychecks = useSelector((state) => state.planner.entities);
  const options = [];

  Object.values(paychecks).forEach((check) => {
    options.push({
      id: 'paycheckSelect',
      value: check.id,
      label: check.id,
    });
  });

  return (
    <div className={layout ? classes[columns] : ''}>
      <label className={classes.label}>{label}</label>
      <Select
        defaultOptions={true}
        cacheOptions={true}
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

export default PaycheckSelect;
