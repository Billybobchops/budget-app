import classes from "./SubmitButton.module.css";

const SubmitButton = (props) => {
  return <input className={classes.submitBtn} type="submit" value={props.value} />;
};

export default SubmitButton;
