/**
 * creates and returns a conditional object that is
 * used by useForm hook to conditional render inputs
 *
 * @param {string} conditionName
 * @param {function} conditionalFunc
 * @returns
 */

function createConditions(conditionName, conditionalFunc) {
  return {
    name: conditionName,
    conditionCheck: conditionalFunc,
  };
}

export function radioYes() {
  return createConditions(
    'selected radio button must be yes',
    (inputObj, selectedOption) => {
      return selectedOption === 'yes';
    }
  );
}

export function radioNo() {
  return createConditions(
    'selected radio button must be no',
    (inputObj, selectedOption) => {
      return selectedOption === 'no';
    }
  );
}
