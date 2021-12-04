import BasicInput from "../FormUI/BasicInput";

/**
 * creates and returns object representation of form field
 *
 * @param {string} label - label to show with the form input
 * @param {string} name - input name
 * @param {string} type - input type
 * @param {string} defaultValue - default value for the input
 */

export function createFormFieldConfig(
  label,
  name,
  type,
  defaultValue = "",
  placeholder
) {
  return {
    renderInput: (handleChange, value, isValid, error, key) => {
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
    },
    label,
    value: defaultValue,
    valid: false,
    errorMessage: "",
    touched: false,
  };
}
