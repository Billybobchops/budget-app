import classes from './HighLowToggle.module.css';
import { useState } from 'react';

const DividerPipe = () => {
  return <span className={classes.slash}>|</span>;
};

const ToggleButton = ({ option, options, toggle, onClick }) => {
  let toggleClass = `${classes.toggleClass} ${
    option === toggle && classes.toggleActive
  }`;

  return (
    <>
      <button className={toggleClass} onClick={onClick}>
        {option}
      </button>
      {!(options.indexOf(option) % 2) && <DividerPipe />}
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
          console.log('option', option);

          return (
            <ToggleButton
              key={option}
              option={option}
              toggle={toggle}
              options={toggleOptions}
              activeToggle={option === toggle}
              onClick={() => {
                setToggle(option);
								// make sure the option being clicked is not already the active sorting method
                if (option !== toggle) {
                  toggleSortFn();
                }
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default HighLowToggle;
