import classes from './Select.module.css';

const Select = (props) => {
  const { name, id, label, dropdownOptions, handleChange } = props;

  const Option = (props) => {
    const { value, key, children } = props;

    return (
      <option value={value} key={key}>
        {children}
      </option>
    );
  };

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
