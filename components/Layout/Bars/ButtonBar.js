import classes from "./ButtonBar.module.css";

const ButtonBar = (props) => {
  return (
    <div className={classes.buttonBar}>
      <div>
        <h2 className={classes.buttonBarTitle}>Add New</h2>
      </div>
      <div>{props.children}</div>
    </div>
  );
};

export default ButtonBar;
