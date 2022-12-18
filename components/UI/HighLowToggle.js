import classes from './HighLowToggle.module.css';
import { useState } from 'react';

const DividerPipe = () => {
  return <span className={classes.slash}>|</span>;
};

const ToggleButton = (props) => {
  let toggleClass = `${classes.toggleClass} ${
    props.option === props.toggle && classes.toggleActive
  }`;

  return (
    <>
      <button className={toggleClass} onClick={props.onClick}>
        {props.option}
      </button>
      {!(props.options.indexOf(props.option) % 2) && <DividerPipe />}
    </>
  );
};

const HighLowToggle = ({ toggleOptions, toggleTitle, toggleSortFn }) => {
  const [toggle, setToggle] = useState(toggleOptions[0]); 

  return (
    <>
      <p>{toggleTitle}</p>
      <div className={classes.toggleWrap}>
        {toggleOptions.map((option) => {
          return (
            <ToggleButton
              key={option}
              option={option}
              toggle={toggle}
              options={toggleOptions}
              activeToggle={option === toggle}
              onClick={() => {
                setToggle(option);
								toggleSortFn();
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default HighLowToggle;
