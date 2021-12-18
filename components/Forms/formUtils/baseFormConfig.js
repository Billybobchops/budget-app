import BasicInput from '../FormUI/BasicInput';
import Button from '../../UI/Buttons/Button';

/**
 * creates and returns object representation of form fields
 *
 * @param {string} label - label to show with the form input
 * @param {string} name - input name
 * @param {string} type - input type
 * @param {string} defaultValue - default value for the input
 * @param {string} placeholder - placeholder text
 */

export function createFormFieldConfig(
  label,
  name,
  type,
  defaultValue = '',
  placeholder
) {
  return {
    renderInput: (handleChange, value, isValid, error, key) => {
      if (type !== 'break' && type !== 'button')
        return (
          <BasicInput
            label={label}
            name={name}
            type={type}
            handleChange={handleChange}
            value={value}
            isValid={isValid}
            errorMessage={error}
            key={key}
            placeholder={placeholder}
          />
        );
      if (type === 'break') return <br key={key} />;
      // if (type === 'button')
        // return <Button key={key} text={label} clickHandler={handleChange} />;
    },
    label,
    value: defaultValue,
    valid: false,
    errorMessage: '',
    touched: false,
  };
}
