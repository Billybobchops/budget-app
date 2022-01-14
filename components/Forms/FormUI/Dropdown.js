import classes from './Dropdown.module.css';

const Option = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};

const Dropdown = ({
  id,
  label,
  type,
  name,
  value,
  options,
  handleChange,
  layout,
}) => {
  const columns = `${layout}`;

  return (
    <div className={layout ? classes[columns] : ''}>
      <div className={classes.arrowStyle}>
        <label className={classes.label}>{label}</label>
        <select
          type={type}
          id={id}
          name={name}
          className={classes.selectInput}
          onChange={handleChange}
          value={value}
        >
          {options.map((option) => {
            return (
              <Option
                key={option.title || option}
                value={option.title || option}
              >
                {option.title || option}
              </Option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
