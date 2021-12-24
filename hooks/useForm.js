import { useState, useCallback, useMemo, useEffect } from 'react';
// import debounce from 'lodash.debounce';

function useForm(formObj) {
  const [form, setForm] = useState(formObj);
  const [selectedOption, setSelectedOption] = useState(null);

  function renderFormInputs() {
    return Object.values(form).map((inputObj) => {
      const { value, valid, errorMessage, label, renderInput } = inputObj;
      // const isSelected = selectedOption === value;
      // console.log(isSelected); // boolean value logging just fine to the console here!
      return renderInput(
        onInputChange,
        value,
        valid,
        errorMessage,
        label,
        selectedOption // null at first, but changes with onInputChange()
      );
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

  // my Fn: extracting logic from onInputChange...to debounce?
  const updateInputValidity = useCallback(() => {}, []);

  // wrapped in the useCallback hook to avoid creating a new function each time
  // the state is updated and code inside this hook executes again.
  const onInputChange = useCallback(
    (event) => {
      const { id, value: enteredValue } = event.target;
      // copy input object whose value was changed to avoid mutating original state
      const inputObj = { ...form[id] };
      // update obj value to entered value (controlled component)
      inputObj.value = enteredValue;

      // update radio button object's checked state (controlled component)
      if (inputObj.type === 'radio') {
        const option = inputObj.label; // intermediate variable
        setSelectedOption(option); // scheduled async useState update
        // update the object's checked value to true
        // inputObj.checked = option === id; // ...but doesn't change it to false when another is selected?
      }

      /////////////////////////////////////////////// DEBOUNCE
      // check input field's validity
      const isValidInput = isInputFieldValid(inputObj); // boolean

      // if at least one radio is selected, then set the radio group to valid
      if (inputObj.type === 'radio' && isValidInput) {
        Object.values(form).map((input) => {
          const inputCopy = input;
          if (input.type === 'radio' && input !== inputObj) {
            inputCopy.valid = true;
          }
          if (input.type === 'button') inputCopy.valid = true; // set any btns to valid
          setForm({ ...form, inputCopy });
        });
      }

      // update input field's validity state...THIS IS WHAT NEEDS TO BE DEBOUNCED
      // if input is valid (T) and it was previously set to invalid (F) set its valid status to true (T)
      // if input is not valid (F) and it was previously valid (T) set its valid status to false (F)
      if (isValidInput && !inputObj.valid) {
        inputObj.valid = true;
      } else if (!isValidInput && inputObj.valid) {
        inputObj.valid = false;
      }

      // refactor attempt ^
      // if (isValidInput && !inputObj.valid) inputObj.valid = true;
      // if (!isValidInput && inputObj.valid) inputObj.valid = false;

      // mark input field as touched
      inputObj.touched = true;
      setForm({ ...form, [id]: inputObj });

      return inputObj;
    },

    [form, isInputFieldValid]
  );

  // const debouncedValidityHandler = useMemo(
  //   () => debounce(updateInputValidity, 300),
  //   [updateInputValidity]
  // );

  // Stop the invocation of the debounced function
  // after unmounting
  // useEffect(() => {
  //   debouncedValidityHandler.cancel();
  // });

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

  return { renderFormInputs, isFormValid, form, selectedOption };
}

export default useForm;
