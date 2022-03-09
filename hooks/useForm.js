import { useState, useCallback, useMemo, useEffect } from 'react';
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

      // if an input doesn't meet condition, its not visible, so set valid state to true so form can submit
      if (!checkConditions(inputObj, selectedOption)) inputObj.valid = true;
    });
  }

  // const updateInputValidity = useCallback(
  //   (event) => {
  //     const { id } = event.target;
  //     const inputObj = { ...form[id] }; // copy inputObj
  //     const isValidInput = isInputFieldValid(inputObj);

  //     if (inputObj.type === 'radio' && isValidInput) {
  //       Object.values(form).map((input) => {
  //         const inputCopy = input;
  //         if (input.type === 'radio' && input !== inputObj)
  //           inputCopy.valid = true;
  //       });
  //     }

  //     if (isValidInput && !inputObj.valid) {
  //       inputObj.valid = true;
  //     } else if (!isValidInput && inputObj.valid) {
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

  /**
   * iterates over a given input's conditions and returns a boolean
   * @param {object} inputObj - object representation of an input field
   * @param {string} selectedOption - radio input's value (stored in state var)
   */
  const checkConditions = useCallback((inputObj, selectedOption) => {
    // always render inputs that don't have conditions set
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
      if (!inputField.validationRules) return true;

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

  /**
   * dynamically get id and value of input whether its a regular
   * input or it's a react-select input
   * @param {event} event
   * @returns {object} object containing the input's id and value
   */
  const getProperties = (event) => {
    if (event.target === undefined) {
      let { id, category, value: enteredValue } = event;
      return {
        id,
        category,
        enteredValue,
      };
    }

    if (event.target !== undefined) {
      let { id, value: enteredValue } = event.target;
      return {
        id,
        enteredValue,
      };
    }
  };

  // wrapped in useCallback hook to avoid creating a new function each time
  // the state is updated and code inside useForm() hook executes again.
  const onInputChange = useCallback(
    (event) => {
      const { id, enteredValue, category } = getProperties(event);
      const inputObj = { ...form[id] }; // copy inputObj to avoid mutating original state
      const reactSelectInput =
        inputObj.type === 'search' ||
        inputObj.type === 'asyncCreatable' ||
        inputObj.type === 'categorySelect' ||
        inputObj.type === 'paycheckSelect' ||
        inputObj.type === 'itemSelect';

      // (controlled component) update value state to entered value
      if (reactSelectInput) {
        inputObj.value = {
          id,
          category,
          value: enteredValue,
          label: enteredValue,
        };
      } else {
        inputObj.value = enteredValue;
      }

      // (controlled component) update state & object's radio button checked state
      if (inputObj.type === 'radio') {
        const radioOption = inputObj.label; // intermediate variable for immediate use
        setSelectedOption(radioOption); // scheduled async useState update
        // update the object's checked value to true
        // inputObj.checked = option === id; // ...but doesn't change it to false when another is selected?
      }

      ///////////////////////////////////////////// DEBOUNCE validity state update here
      const isValidInput = isInputFieldValid(inputObj);

      // if at least one radio is selected, then set entire radio group to valid
      // and set inputs now rendered conditionally b/c of the radio to valid: false
      if (inputObj.type === 'radio' && isValidInput) {
        Object.values(form).map((input) => {
          if (input.type === 'radio' && input !== inputObj) input.valid = true;
          if (
            !checkConditions(input, selectedOption) &&
            input.type !== 'warningLabel'
          )
            input.valid = false;
        });
      }

      // check if the input is now valid against its validation rules
      if (isValidInput && !inputObj.valid) {
        inputObj.valid = true;
      } else if (!isValidInput && inputObj.valid) {
        inputObj.valid = false;
      }

      // if (inputObj.errorMessage && !inputObj.valid)
      //   addToast(inputObj.errorMessage);

      // debouncedValidityHandler(event); // cannot access this fn because it is wrapped with useMemo();

      // kind of works on the first keystroke only...
      // setTimeout(() => {
      //   console.log('setTimeout running...');
      //   updateInputValidity(inputObj);
      // }, 600);

      /////////////////////////////////////////////
      inputObj.touched = true;
      setForm({ ...form, [id]: inputObj });

      return inputObj;
    },

    [form, isInputFieldValid, checkConditions, selectedOption]
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
