// custom category dropdown
import { useSelector } from 'react-redux';
import classes from './SearchInput.module.css';
import customStyles from '../formUtils/reactSelectStyles';
import Select from 'react-select';

const CategorySelect = ({
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

  const categories = useSelector((state) => state.categories.entities);
  const options = [];

  Object.values(categories).forEach((category) => {
    options.push({
      id: 'categorySelect',
      value: category.id,
      label: category.id,
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

export default CategorySelect;
