import classes from "./HighLowToggle.module.css";

const HighLowToggle = () => {
  return (
    <div className={classes.sorting}>
      <span className={classes.sortingTitle}>
        Percentage of Planned Net Income:
      </span>
      <span className={classes.break}>
        <br />
      </span>
      <button className={classes.sortingBtn}>High to Low</button>
      <span className={classes.slash}>|</span>
      <button className={classes.sortingBtn}>Low to High</button>
    </div>
  );
};

export default HighLowToggle;