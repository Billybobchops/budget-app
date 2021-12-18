import BasicInput from '../FormUI/BasicInput';
import Button from '../../UI/Buttons/Button';
import Select from '../FormUI/Select';

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
  placeholder,
  dropdownOptions
) {
  return {
    renderInput: (handleChange, value, isValid, error, key) => {
      if (type !== 'break' && type !== 'button' && type !== 'dropdown')
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
      if (type === 'button') return <Button key={key} text={label} />;
      if (type === 'dropdown')
        return (
          <Select key={key} label={label} dropdownOptions={dropdownOptions} />
        );
    },
    label,
    value: defaultValue,
    valid: false,
    errorMessage: '',
    touched: false,
  };
}
