import classes from './Select.module.css';

const Select = (props) => {
  const { name, id, label, dropdownOptions, handleChange } = props;

  return (
    <div className={classes.arrowStyle}>
      <label className={classes.label}>{label}</label>
      <select
        name={name}
        id={id}
        className={classes.selectInput}
        onChange={handleChange}
      >
        {dropdownOptions.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
