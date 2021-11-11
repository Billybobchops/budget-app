import classes from "./Button.module.css";

const Button = (props) => {
  return <button className={classes.button}>{props.text}</button>
};

export default Button;