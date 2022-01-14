import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useToast } from '../store/ToastProvider';
// import debounce from 'lodash.debounce';

function useForm(formObj) {
  const [form, setForm] = useState(formObj);
  const [selectedOption, setSelectedOption] = useState(null);
  const { addToast } = useToast();

  function renderFormInputs() {
    return Object.values(form).map((inputObj) => {
      const { value, valid, errorMessage, label, renderInput } = inputObj;

      // only render inputs when conditions are met
      if (checkConditions(inputObj, selectedOption)) {
        return renderInput(
          onInputChange,
          value,
          valid,
          errorMessage,
          label,
          selectedOption
        );
      }
    });
  }

  /**
   * iterates over a given input's conditions and returns a boolean
   * 
   * @param {object} inputObj - object representation of an input field
   * @param {string} selectedOption - radio input's value (stored in state var)
   */
  
  const checkConditions = useCallback((inputObj, selectedOption) => {
    // always render inputs that don't have any conditions set aka (null)
    if (!inputObj.conditions) return true; 

    for (const condition of inputObj.conditions) {
      return condition.conditionCheck(inputObj, selectedOption);
    }
  }, []);

  /**
   * iterates over all validation rules for a given input field and returns a boolean
   * @param {object} inputField - object representation of an input field
   */

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

  // const updateInputValidity = useCallback(
  //   (event) => {
  //     const { id } = event.target;
  //     const inputObj = { ...form[id] }; // copy inputObj
  //     const isValidInput = isInputFieldValid(inputObj);

  //     // if at least one radio is selected, then set entire radio group to valid
  //     if (inputObj.type === 'radio' && isValidInput) {
  //       Object.values(form).map((input) => {
  //         const inputCopy = input;
  //         if (input.type === 'radio' && input !== inputObj)
  //           inputCopy.valid = true;
  //       });
  //     }

  //     if (isValidInput && !inputObj.valid) {
  //       // now valid was previously invalid set its valid status to true (T)
  //       inputObj.valid = true;
  //     } else if (!isValidInput && inputObj.valid) {
  //       // was not valid and previously valid set its valid status to false (F)
  //       inputObj.valid = false;
  //     }

  //     if (inputObj.errorMessage && !inputObj.valid)
  //       addToast(inputObj.errorMessage);
  //   },
  //   [addToast, form, isInputFieldValid]
  // );

  // const debouncedValidityHandler = useMemo(() => {
  //   debounce(updateInputValidity, 400);
  // }, [updateInputValidity]);

  // wrapped in useCallback hook to avoid creating a new function each time
  // the state is updated and code inside this hook executes again.
  const onInputChange = useCallback(
    (event) => {
      const { id, value: enteredValue } = event.target;
      const inputObj = { ...form[id] }; // copy inputObj (whose value was changed) to avoid mutating original state
      inputObj.value = enteredValue; // update state to entered value (controlled component)

      // update object's radio button checked state (controlled component)
      if (inputObj.type === 'radio') {
        const radioOption = inputObj.label; // intermediate variable for immediate use
        setSelectedOption(radioOption); // scheduled async useState update
        // update the object's checked value to true
        // inputObj.checked = option === id; // ...but doesn't change it to false when another is selected?
      }

      if (inputObj.type === 'dropdown') {
        setForm({ ...form, [id]: inputObj });
        return inputObj;
      }

      ///////////////////////////////////////////// DEBOUNCE validity state update here
      const isValidInput = isInputFieldValid(inputObj);

      // if at least one radio is selected, then set entire radio group to valid
      if (inputObj.type === 'radio' && isValidInput) {
        Object.values(form).map((input) => {
          const inputCopy = input;
          if (input.type === 'radio' && input !== inputObj)
            inputCopy.valid = true;
        });
      }

      if (isValidInput && !inputObj.valid) {
        // now valid was previously invalid set its valid status to true (T)
        inputObj.valid = true;
      } else if (!isValidInput && inputObj.valid) {
        // was not valid and previously valid set its valid status to false (F)
        inputObj.valid = false;
      }

      if (inputObj.errorMessage && !inputObj.valid)
        addToast(inputObj.errorMessage);

      // debouncedValidityHandler(event); // cannot access this fn because it is wrapped with useMemo();

      // kind of works on the first keystroke only...
      // setTimeout(() => {
      //   console.log('setTimeout running...');
      //   updateInputValidity(inputObj);
      // }, 600);

      /////////////////////////////////////////////

      // mark input field as touched
      inputObj.touched = true;
      setForm({ ...form, [id]: inputObj });

      return inputObj;
    },

    [form, addToast, isInputFieldValid]
  );

  // Stop the invocation of the debounced function AFTER unmounting
  // useEffect(() => {
  //   debouncedValidityHandler.cancel();
  // });

  /**
   * returns boolean value indicating whether overall form is valid
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
