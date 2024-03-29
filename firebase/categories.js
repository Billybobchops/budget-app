import { db } from './firebaseClient';
import {
	collection,
	deleteField,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	where,
	writeBatch,
} from 'firebase/firestore';

/**
 * adds a category-title map field to the current user's doc in 'categories' collection
 * @param {string} uid - to give user's collection unique id
 * @param {string} category title
 */
export const addCategory = async (uid, formData) => {
	const key = formData.id;
	const userCategoriesRef = doc(db, `categories/${uid}`); // creates doc with user's UID
	const docData = {
		[key]: { ...formData },
	};

	try {
		await setDoc(userCategoriesRef, docData, { merge: true });
		return { ...formData };
	} catch (error) {
		console.log(error);
	}
};

/**
 * fetches a user's categories
 * @param {string} uid - to get user's collection
 * @returns a user's categories
 */
export const getAllCategories = async (uid) => {
	const userCategoriesRef = doc(db, `categories/${uid}`); // creates ref to doc with user's UID
	const docSnapshot = await getDoc(userCategoriesRef); // returns a promise that resolves to a doc snapshot
	const categories = {};

	if (docSnapshot.exists()) {
		const docData = docSnapshot.data();

		Object.values(docData).forEach((category) => {
			const { id, createdOn, createdOnMonthYear } = category;
			categories[id] = { id, createdOn, createdOnMonthYear };
		});
	}

	return categories;
};

/**
 * updates a user's category id and:
 * updates the category field for each associated item in the budgetItems collection
 * updates the category field for each associated item in the expenseItems collection
 * @param {*} uid - to get user's collections
 * @param {*} prevID - the previous category ID
 * @param {*} newID - the new category ID to update to 
 */
export const batchUpdateCategory = async (uid, prevID, newID) => {
	const batch = writeBatch(db);

	try {
		// 1. Update category name in Categories collection
		const categoryRef = doc(db, `categories/${uid}`);
		const categorySnapshot = await getDoc(categoryRef);

		if (categorySnapshot.exists()) {
			const prevCategoryData = categorySnapshot.data()?.[prevID];

			// Delete the old category entry
			batch.update(categoryRef, { [prevID]: deleteField() });

			// Create a new category entry with the updated ID
			const newCategoryData = {
				[newID]: {
					id: newID,
					createdOn: prevCategoryData?.createdOn,
					createdOnMonthYear: prevCategoryData?.createdOnMonthYear,
				},
			};

			// Merge the new category entry with the existing data
			batch.set(categoryRef, newCategoryData, { merge: true });
		}

		// 2. Update associated items in BudgetItems collection
		const budgetItemsRef = collection(db, `budgetItems/${uid}/items`);
		const budgetItemsQuery = query(budgetItemsRef, where('data.category', '==', prevID));
		const budgetItemsSnapshot = await getDocs(budgetItemsQuery);

		budgetItemsSnapshot.forEach((doc) => {
			const itemRef = doc.ref;
			batch.update(itemRef, { 'data.category': newID });
		});

		// 3. Update associated items in ExpenseItems collection
		const expenseItemsRef = collection(db, `expenseItems/${uid}/items`);
		const expenseItemsQuery = query(expenseItemsRef, where('data.category', '==', prevID));
		const expenseItemsSnapshot = await getDocs(expenseItemsQuery);

		expenseItemsSnapshot.forEach((doc) => {
			const itemRef = doc.ref;
			batch.update(itemRef, { 'data.category': newID });
		});

		// Commit the batch
		await batch.commit();
		console.log('Batch update successful');
		return newID;
	} catch (error) {
		console.error('Batch update failed', error);
	}
};

/**
 * Deletes a category and its associated items from budgetItems and expenseItems collections
 * @param {string} uid - User ID
 * @param {string} categoryID - Category ID to delete
 */
export const batchDeleteCategory = async (uid, categoryID) => {
	const batch = writeBatch(db);

	try {
		// 1. Delete the category entry from Categories collection
		const categoryRef = doc(db, `categories/${uid}`);
		batch.update(categoryRef, { [categoryID]: deleteField() });

		// 2. Delete associated items in BudgetItems collection
		const budgetItemsRef = collection(db, `budgetItems/${uid}/items`);
		const budgetItemsQuery = query(budgetItemsRef, where('data.category', '==', categoryID));
		const budgetItemsSnapshot = await getDocs(budgetItemsQuery);

		budgetItemsSnapshot.forEach((doc) => { batch.delete(doc.ref) });

		// 3. Delete associated items in ExpenseItems collection
		const expenseItemsRef = collection(db, `expenseItems/${uid}/items`);
		const expenseItemsQuery = query(expenseItemsRef, where('data.category', '==', categoryID));
		const expenseItemsSnapshot = await getDocs(expenseItemsQuery);

		expenseItemsSnapshot.forEach((doc) => { batch.delete(doc.ref) });

		// Commit the batch
		await batch.commit();
		console.log('Batch deletion successful');
	} catch (error) {
		console.error('Batch deletion failed', error);
	}
};
