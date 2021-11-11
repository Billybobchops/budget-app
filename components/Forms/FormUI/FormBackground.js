import classes from "./FormBackground.module.css";

const FormBackground = (props) => {
  return <div className={classes.box}>{props.children}</div>;
};

export default FormBackground;
