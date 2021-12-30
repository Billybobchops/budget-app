import { createContext, useState } from 'react';

const FormContext = createContext({
  modal: false,
  categoryForm: false,
  itemForm: false,
  onkeydown: () => {},
  onCategoryClick: () => {},
  onItemClick: () => {},
  onShowCategoryClick: () => {},
});

export const FormContextProvider = (props) => {
  const [modal, setModal] = useState(false);
  const [categoryForm, setCategoryForm] = useState(false);
  const [itemForm, setItemForm] = useState(false);

  const keyDownHandler = () => {
    setModal(false);
    setCategoryForm(false);
    setItemForm(false);
  };

  const categoryClickHandler = () => {
    setModal(true);
    setCategoryForm(true);
  };

  const itemClickHandler = () => {
    setModal(true);
    setItemForm(true);
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
        onkeydown: keyDownHandler,
        onCategoryClick: categoryClickHandler,
        onItemClick: itemClickHandler,
        onShowCategoryClick: showCategoryFormHandler,
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};

export default FormContext;
