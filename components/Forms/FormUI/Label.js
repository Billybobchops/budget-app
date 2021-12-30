import classes from './Label.module.css';

const Label = ({ children, label }) => {
  let labelClass = !!label ? 'miniLabel' : 'label';

  return <label className={classes[`${labelClass}`]}>{children}</label>;
};

export default Label;
