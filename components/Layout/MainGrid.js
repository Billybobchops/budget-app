import classes from './MainGrid.module.css';

const MainGrid = ({ children }) => {
	return <main className={classes.main}>{children}</main>;
};

export default MainGrid;
