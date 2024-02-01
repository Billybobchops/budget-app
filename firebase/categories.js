import { db } from './firebaseClient';
import {
	doc,
	getDoc,
	setDoc,
	updateDoc,
	deleteField,
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

// export const updateCategoryOG = async (uid, prevID, newID) => {
// 	try {
// 		const userCategoriesRef = doc(db, `categories/${uid}`);
// 		const docSnapshot = await getDoc(userCategoriesRef);

// 		if (docSnapshot.exists()) {
// 			const docData = docSnapshot.data();

// 			await updateDoc(userCategoriesRef, );
// 		}
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

export const updateCategory = async (uid, prevID, newID) => {
	try {
		const userCategoriesRef = doc(db, `categories/${uid}`);
		const docSnapshot = await getDoc(userCategoriesRef);

		if (docSnapshot.exists()) {
			const docData = docSnapshot.data();

			if (docData[prevID]) {
				const prevCategoryData = docData[prevID];

				// Remove the old category entry using arrayRemove
				await updateDoc(userCategoriesRef, {
					[prevID]: deleteField(),
				});

				// Check if prevCategoryData is defined before setting the new category entry
				if (prevCategoryData) {
					// Create a new category entry with the updated ID
					const newCategoryData = {
						[newID]: {
							id: newID,
							createdOn: prevCategoryData.createdOn,
							createdOnMonthYear: prevCategoryData.createdOnMonthYear,
						},
					};

					// Check if newCategoryData is valid (not undefined)
					if (newCategoryData[newID]) {
						// Merge the new category entry with the existing data
						await setDoc(userCategoriesRef, newCategoryData, { merge: true,});
					} else {
						console.log(`Invalid data for new category with ID ${newID}.`);
					}
				} else {
					console.log(`Category with ID ${prevID} is undefined.`);
				}
			}
		}
	} catch (error) {
		console.log(error);
	}
};
