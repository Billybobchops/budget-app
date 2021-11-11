import classes from "./SquareButton.module.css";

const SquareButton = (props) => {
  return <button className={classes.button}>{props.text}</button>;
};

export default SquareButton;
