// custom budget items dropdown
import { useSelector } from 'react-redux';
import classes from './SearchInput.module.css';
import customStyles from '../formUtils/reactSelectStyles';
import Select from 'react-select';

const ItemSelect = ({
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

  const items = useSelector((state) => state.itemsAndPlanner.items.entities);
  const options = [];

  Object.values(items).forEach((item) => {
    options.push({
      id: 'itemSelect',
      label: item.id,
      value: item.id,
      category: item.category,
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

export default ItemSelect;
