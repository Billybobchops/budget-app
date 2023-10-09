import classes from './SubmitButton.module.css';

const SubmitButton = ({ value, disabled }) => {
  const disabledBtn = disabled && 'disabled';
  const text = disabled ? '👆 Complete me!' : `😜 ${value}`;

  return (
    <input
      className={`${[classes.submitBtn, classes[disabledBtn]].join(' ')}`}
      type='submit'
      value={text}
      disabled={disabled}
    />
  );
};

export default SubmitButton;
