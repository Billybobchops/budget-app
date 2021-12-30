import BasicInput from '../FormUI/BasicInput';
import TinyButton from '../FormUI/CategoryToggleButton';
import Select from '../FormUI/Select';
import RadioButton from '../FormUI/RadioButtons';

/**
 * creates and returns OBJECT REPRESENTATION of form fields
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
  selectedOption,
  dropdownOptions
) {
  return {
    renderInput: (handleChange, value, isValid, error, key, selectedOption) => {
      if (
        type !== 'break' &&
        type !== 'button' &&
        type !== 'dropdown' &&
        type !== 'radio'
      )
        return (
          <BasicInput
            id={name}
            key={key}
            label={label}
            name={name}
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
            id={label}
            key={key}
            label={label}
            name={name}
            handleChange={handleChange}
            checked={selectedOption === label}
            value={value}
            isValid={isValid}
            errorMessage={error}
          />
        );
      if (type === 'dropdown')
        return (
          <Select
            id={label}
            key={key}
            label={name}
            name={name}
            type={type}
            handleChange={handleChange}
            value={value}
            isValid={true}
            errorMessage={error}
            dropdownOptions={dropdownOptions}
          />
        );
      if (type === 'break') return <br key={key} />;
      if (type === 'button')
        return <TinyButton key={key} text={label} isValid={true} />;
    },
    label,
    name,
    type,
    value: defaultValue,
    valid: type === 'dropdown' || type === 'button' ? true : false,
    touched: false,
    checked: selectedOption === label, 
    errorMessage: '',
  };
}
