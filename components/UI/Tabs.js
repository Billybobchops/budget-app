import classes from "./Tabs.module.css";
import { useState } from "react";

const Tab = (props) => {
  let tabClass = `${classes.tabBtn} ${props.activeTab && classes.tabBtnActive}`;

  return (
    <button className={tabClass} onClick={props.onClick}>
      {props.title}
    </button>
  );
};

const Tabs = (props) => {
  const tabLables = [...props.labels];
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
            }}
          />
        );
      })}
    </div>
  );
};

export default Tabs;

