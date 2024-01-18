import classes from './PlannerBackground.module.css';
import MobileNav from '../Navigation/MobileNav';
import Nav from '../Navigation/Nav';

const PlannerBackground = (props) => {
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

export default PlannerBackground;
