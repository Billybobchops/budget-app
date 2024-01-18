import classes from "./PageBackground.module.css";
import MobileNav from "../../Navigation/MobileNav";
import Nav from "../../Navigation/Nav";

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
