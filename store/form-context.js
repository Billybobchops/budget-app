import { createContext, useState } from 'react';

const FormContext = createContext({
  modal: false,
  categoryForm: false,
  itemForm: false,
  incomeForm: false,
  expenseForm: false,
  plannerForm: false,
  fundForm: false,
  onkeydown: () => {},
  onCategoryClick: () => {},
  onItemClick: () => {},
  onIncomeClick: () => {},
  onExpenseClick: () => {},
  onPlannerClick: () => {},
  onFundClick: () => {},
  onShowCategoryClick: () => {},
});

export const FormContextProvider = (props) => {
  const [modal, setModal] = useState(false);
  const [categoryForm, setCategoryForm] = useState(false);
  const [itemForm, setItemForm] = useState(false);
  const [incomeForm, setIncomeForm] = useState(false);
  const [expenseForm, setExpenseForm] = useState(false);
  const [plannerForm, setPlannerForm] = useState(false);
  const [fundForm, setFundForm] = useState(false);

  const keyDownHandler = () => {
    setModal(false);
    setCategoryForm(false);
    setItemForm(false);
    setIncomeForm(false);
    setExpenseForm(false);
    setPlannerForm(false);
    setFundForm(false);
  };

  const categoryClickHandler = () => {
    setModal(true);
    setCategoryForm(true);
  };

  const itemClickHandler = () => {
    setModal(true);
    setItemForm(true);
  };

  const incomeClickHandler = () => {
    setModal(true);
    setIncomeForm(true);
  };

  const expenseClickHandler = () => {
    setModal(true);
    setExpenseForm(true);
  };

  const plannerClickHandler = () => {
    setModal(true);
    setPlannerForm(true);
  };

  const fundClickHandler = () => {
    setModal(true);
    setFundForm(true);
  };

  const showCategoryFormHandler = () => {
    setItemForm(false);
    setCategoryForm(true);
  };

  return (
    <FormContext.Provider
      value={{
        modal,
        categoryForm,
        itemForm,
        incomeForm,
        expenseForm,
        plannerForm,
        fundForm,
        onkeydown: keyDownHandler,
        onCategoryClick: categoryClickHandler,
        onItemClick: itemClickHandler,
        onIncomeClick: incomeClickHandler,
        onExpenseClick: expenseClickHandler,
        onPlannerClick: plannerClickHandler,
        onFundClick: fundClickHandler,
        onShowCategoryClick: showCategoryFormHandler,
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};

export default FormContext;
