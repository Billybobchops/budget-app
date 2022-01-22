import SearchInput from '../FormUI/SearchInput';
import CategorySelect from '../FormUI/CategorySelect';
import PaycheckSelect from '../FormUI/PaycheckSelect';
import ItemSelect from '../FormUI/ItemSelect';
import AsyncCreatableInput from '../FormUI/AsyncCreatableInput';
import RadioButton from '../FormUI/RadioButtons';
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
    notRequired,
  } = fieldObj;

  // const defaultValidInputs = notRequired === true;

  return {
    renderInput: (handleChange, value, isValid, error, key, selectedOption) => {
      if (type === 'search')
        return (
          <SearchInput
            options={options}
            key={key}
            id={name}
            label={label}
            name={name}
            placeholder={placeholder}
            layout={layout}
            handleChange={handleChange}
            value={value}
            isValid={true}
          />
        );

      if (type === 'categorySelect')
        return (
          <CategorySelect
            key={key}
            id={name}
            label={label}
            name={name}
            placeholder={placeholder}
            layout={layout}
            handleChange={handleChange}
            value={value}
            isValid={isValid}
          />
        );

      if (type === 'paycheckSelect')
        return (
          <PaycheckSelect
            key={key}
            id={name}
            label={label}
            name={name}
            placeholder={placeholder}
            layout={layout}
            handleChange={handleChange}
            value={value}
            isValid={isValid}
          />
        );

      if (type === 'itemSelect')
        return (
          <ItemSelect
            key={key}
            id={name}
            label={label}
            name={name}
            placeholder={placeholder}
            layout={layout}
            handleChange={handleChange}
            value={value}
            isValid={isValid}
          />
        );

      if (type === 'asyncCreatable')
        return (
          <AsyncCreatableInput
            options={options}
            key={key}
            id={name}
            label={label}
            layout={layout}
            handleChange={handleChange}
            value={value}
            isValid={isValid}
          />
        );

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

      if (type === 'button')
        return <TinyButton key={key} text={label} isValid={true} />;

      if (type === 'label' || type === 'miniLabel' || type === 'warningLabel')
        return (
          <Label key={key} isValid={true} label={type}>
            {label}
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
    valid: notRequired ? true : false,
    touched: false,
    checked: selectedOption === label,
    errorMessage: '',
  };
}
