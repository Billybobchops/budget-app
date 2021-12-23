import BasicInput from '../FormUI/BasicInput';
import TinyButton from '../FormUI/TinyButton';
import Select from '../FormUI/Select';
import RadioButton from '../FormUI/RadioButtons';

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
  // dropdownOptions,
  // radioOptions,
  checked = false
) {
  return {
    renderInput: (handleChange, value, isValid, error, key) => {
      if (
        type !== 'break' &&
        type !== 'button' &&
        type !== 'dropdown' &&
        type !== 'radio'
      )
        return (
          <BasicInput
            key={key}
            label={label}
            name={name}
            id={name}
            type={type}
            handleChange={handleChange}
            value={value}
            isValid={isValid}
            errorMessage={error}
            placeholder={placeholder}
          />
        );
      if (type === 'radio')
        return (
          <RadioButton
            key={key}
            label={label}
            name={name}
            handleChange={handleChange}
            checked={checked}
            value={value}
            isValid={isValid}
            errorMessage={error}
          />
        );
      if (type === 'dropdown')
        return (
          <Select
            key={key}
            label={label}
            name={name}
            handleChange={handleChange}
            value={value}
            isValid={isValid}
            errorMessage={error}
            // dropdownOptions={dropdownOptions}
            checked={checked}
          />
        );
      if (type === 'break') return <br key={key} />;
      if (type === 'button') return <TinyButton key={key} text={label} />;
    },
    label,
    value: defaultValue,
    valid: false,
    errorMessage: '',
    touched: false,
    checked,
    name,
  };
}
