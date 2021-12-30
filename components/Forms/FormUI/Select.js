import classes from './Select.module.css';

const Select = (props) => {
  const { id, label, type, name, value, dropdownOptions, handleChange } = props;

  const Option = (props) => {
    const { value, children } = props;

    return <option value={value}>{children}</option>;
  };

  return (
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
            <Option key={option.title} value={option.title}>
              {option.title}
            </Option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
