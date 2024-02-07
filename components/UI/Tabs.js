import classes from './Tabs.module.css';
import { useState } from 'react';

const Tab = ({ activeTab, onClick, title }) => {
	return (
		<button
			className={`${classes.tabBtn} ${activeTab && classes.tabBtnActive}`}
			onClick={onClick}
		>
			{title}
		</button>
	);
};

const Tabs = ({ labels, activeTabFn }) => {
	const tabLables = [...labels];
	const [activeTab, setActiveTab] = useState(tabLables[0]);

	return (
		<div className={classes.tabsWrapper}>
			{tabLables.map((tab) => {
				return (
					<Tab
						key={tab}
						title={tab}
						activeTab={activeTab === tab}
						onClick={() => {
							setActiveTab(tab);
							activeTabFn(tab);
						}}
					/>
				);
			})}
		</div>
	);
};

export default Tabs;
