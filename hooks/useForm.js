import { useState, useCallback, useMemo, useEffect } from 'react';
import debounce from 'lodash.debounce';

function useForm(formObj) {
  const [form, setForm] = useState(formObj);

  function renderFormInputs() {
    return Object.values(form).map((inputObj) => {
      const { value, label, errorMessage, valid, renderInput } = inputObj;
      return renderInput(onInputChange, value, valid, errorMessage, label);
    });
  }

  // iterates over all validation rules for a given input and returns a boolean
  const isInputFieldValid = useCallback(
    (inputField) => {
      for (const rule of inputField.validationRules) {
        if (!rule.validate(inputField.value, form)) {
          inputField.errorMessage = rule.message;
          return false;
        }
      }
      return true;
    },
    [form]
  );

  // my Fn: extracting logic from onInputChange...
  const updateInputValidity = useCallback(() => {}, []);

  // wrapped in the useCallback hook to avoid creating a new function each time
  // the state is updated and code inside this hook executes again.
  const onInputChange = useCallback(
    (event) => {
      // const { value, id } = event.target; // new way
      // const inputObj = { ...form[id] }; // new way

      const { name, value } = event.target; // Original way
      // copy input object whose value was changed
      const inputObj = { ...form[name] }; // Original way
      // update value to entered value (controlled component)
      inputObj.value = value;

      // update radio button if checked
      // if (inputObj.type === 'radio') inputObj.checked = true;
      // if (inputObj.type === 'radio') console.log(`This is a radio button`);
      // if (inputObj.type === 'radio') console.log(inputObj.checked);

      ///////////////////////////////////////////////
      // check input field's validity
      const isValidInput = isInputFieldValid(inputObj); // boolean

      // update input field's validity state...THIS IS WHAT NEEDS TO BE DEBOUNCED
      // if input is valid (T) and it was previously set to invalid (F) set its valid status to true (T)
      // if input is not valid (F) and it was previously valid (T) set its valid status to false (F)

      if (isValidInput && !inputObj.valid) {
        inputObj.valid = true;
      } else if (!isValidInput && inputObj.valid) {
        inputObj.valid = false;
      }

      // if (isValidInput && !inputObj.valid) inputObj.valid = true;
      // if (!isValidInput && inputObj.valid) inputObj.valid = false;

      // mark input field as touched
      inputObj.touched = true;
      setForm({ ...form, [name]: inputObj });

      return inputObj;
    },

    [form, isInputFieldValid]
  );

  const debouncedValidityHandler = useMemo(
    () => debounce(updateInputValidity, 300),
    [updateInputValidity]
  );

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    debouncedValidityHandler.cancel();
  });

  /**
   * returns boolean value indicating whether overall form is valid
   *
   * @param {object} formObj - object representation of a form
   */

  const isFormValid = useCallback(() => {
    let isValid = true;
    const arr = Object.values(form);

    for (let i = 0; i < arr.length; i++) {
      if (!arr[i].valid) {
        isValid = false;
        break;
      }
    }

    return isValid;
  }, [form]);

  return { renderFormInputs, isFormValid, form };
}

export default useForm;
