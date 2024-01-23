import { useRef, useEffect, useContext, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import store from '../../store';
import { addNewItem } from '../../store/items-slice';
import useForm from '../../hooks/useForm';
import FormContext from '../../store/form-context';
import { itemConfig } from './formUtils/itemConfig';
import classes from './FormUI/FormStyles.module.css';
import FormBackground from './FormUI/FormBackground';
import SubmitButton from './FormUI/SubmitButton';
import { formatItemDate, generateMonthYear } from '../../utils/helpers';

const ItemForm = () => {
	const { renderFormInputs, isFormValid, form } = useForm(itemConfig);
	const {
		user: { uid },
	} = useAuth();
	const formRef = useRef();
	const { onkeydown } = useContext(FormContext);

	const submitHandler = (e) => {
		e.preventDefault();
		const formData = {
			category: form.categorySelect.value.value,
			id: form.title.value.trim(),
			budgetAmount: +form.budgetAmount.value,
			billDate: formatItemDate(form.billDate.value),
			createdOn: new Date().toLocaleDateString(),
			createdOnMonthYear: generateMonthYear(),
			paycheckSelect:
				form.paycheckSelect.value === ''
					? null
					: form.paycheckSelect.value.value,
		};
		store.dispatch(addNewItem({ uid, formData }));
		onkeydown();
	};

	const checkIfClickedOutside = useCallback(
		(e) => {
			if (!formRef.current.contains(e.target)) {
				onkeydown();
			}
		},
		[onkeydown]
	);

	useEffect(() => {
		document.addEventListener('mousedown', checkIfClickedOutside);

		return () => {
			document.removeEventListener('mousedown', checkIfClickedOutside);
		};
	}, [checkIfClickedOutside]);

	return (
		<form onSubmit={submitHandler} ref={formRef}>
			<FormBackground>
				<h1 className={classes.header}>Add a New Budget Item</h1>
				{renderFormInputs()}
				<SubmitButton value='Submit' disabled={!isFormValid()} />
			</FormBackground>
		</form>
	);
};

export default ItemForm;
