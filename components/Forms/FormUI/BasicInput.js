import classes from "./BasicInput.module.css";

const BasicInput = (props) => {
  return (
    <>
      <label className={classes.label} htmlFor={props.id}>
        {props.label}
      </label>
      <input
        className={classes.input}
        type={props.type}
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
      ></input>
    </>
  );
};

export default BasicInput;
