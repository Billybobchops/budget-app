import classes from "./SquareButton.module.css";

const SquareButton = (props) => {
  return (
    <button className={classes.button} onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default SquareButton;
