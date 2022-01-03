import classes from './Dropdown.module.css';

const Option = (props) => {
  const { value, children } = props;

  return <option value={value}>{children}</option>;
};

const Dropdown = (props) => {
  const {
    id,
    label,
    type,
    name,
    value,
    dropdownOptions,
    handleChange,
    layout,
  } = props;

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
          {dropdownOptions.map((option) => {
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
