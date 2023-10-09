import classes from "./PageBackground.module.css";
import MobileNav from "../../navigation/MobileNav";
import Nav from "../../navigation/Nav";

const PageBackground = (props) => {
  return (
    <>
      <MobileNav />
      <div className={classes.mainGrid}>
        <div className={classes.navDrawer}>
          <Nav />
        </div>
        <div>
          <div className={classes.pageGrid}>{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default PageBackground;
