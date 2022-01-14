import BasicInput from '../FormUI/BasicInput';
import TinyButton from '../FormUI/CategoryToggleButton';
import RadioButton from '../FormUI/RadioButtons';
import Label from '../FormUI/Label';
import Dropdown from '../FormUI/Dropdown';

/**
 * creates and returns OBJECT REPRESENTATION of form fields
 *
 * @param {string} label - label to show with the form input
 * @param {string} name - input name
 * @param {string} type - input type
 * @param {string} defaultValue - default value for the input
 * @param {string} placeholder - placeholder text
 */

export function createFormFieldConfig(fieldObj) {
  const {
    label,
    name,
    type,
    defaultValue = '',
    placeholder,
    selectedOption,
    dropdownOptions,
    layout,
  } = fieldObj;

  return {
    renderInput: (handleChange, value, isValid, error, key, selectedOption) => {
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
          <Dropdown
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
            layout={layout}
          />
        );
      if (type === 'button')
        return <TinyButton key={key} text={label} isValid={true} />;
      if (type === 'label')
        return (
          <Label key={key} isValid={true}>
            {name}
          </Label>
        );
      if (type === 'miniLabel')
        return (
          <Label key={key} isValid={true} label={label}>
            {name}
          </Label>
        );
      if (type === 'break') return <br key={key} />;

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
          layout={layout}
        />
      );
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
