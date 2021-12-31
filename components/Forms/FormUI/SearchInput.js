import classes from './SearchInput.module.css';
import useForm from '../../../hooks/useForm';
import { expenseSearchConfig } from '../formUtils/expenseMiniConfigs/expenseSearchConfig';

const SearchInput = () => {
  const { renderFormInputs, isFormValid, form } = useForm(expenseSearchConfig);

 
  return <>{renderFormInputs()}</>;
};

export default SearchInput;
