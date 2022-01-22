import classes from './Label.module.css';

const Label = ({ children, label }) => {
  const labelClass = `${label}`;

  return <label className={classes[labelClass]}>{children}</label>;
};

export default Label;
