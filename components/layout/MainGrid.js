import classes from "./MainGrid.module.css";

const MainGrid = (props) => {
  return <main className={classes.main}>{props.children}</main>
};

export default MainGrid;