import RadioButton from '../FormUI/RadioButtons';
import SearchInput from '../FormUI/SearchInput';
import AsyncCreatableInput from '../FormUI/AsyncCreatableInput';
import TinyButton from '../FormUI/CategoryToggleButton';
import Label from '../FormUI/Label';
import BasicInput from '../FormUI/BasicInput';

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
    options,
    layout,
  } = fieldObj;

  return {
    renderInput: (handleChange, value, isValid, error, key, selectedOption) => {
      if (type === 'radio')
        return (
          <RadioButton
            key={key}
            id={label}
            label={label}
            name={name}
            handleChange={handleChange}
            checked={selectedOption === label}
            value={value}
            isValid={isValid}
            errorMessage={error}
          />
        );

      if (type === 'search')
        return (
          <SearchInput
            key={key}
            id={label}
            label={label}
            options={options}
            placeholder={placeholder}
            layout={layout}
          />
        );

      if (type === 'asyncCreatable')
        return (
          <AsyncCreatableInput
            key={key}
            id={label}
            label={label}
            options={options}
            layout={layout}
          />
        );

      if (type === 'button')
        return <TinyButton key={key} text={label} isValid={true} />;

      if (type === 'label')
        // CONSOLIDATE THIS SOMEHOW WITH MINILABEL BELOW?
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

      return (
        <BasicInput
          key={key}
          id={name}
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
    valid: type === 'button' ? true : false,
    touched: false,
    checked: selectedOption === label,
    errorMessage: '',
  };
}

// if (type === 'break') return <br key={key} />;
