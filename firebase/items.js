import { db } from './firebaseClient';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';

/**
 * adds a budget item to the current user's doc in the 'items' subcollection
 * of the 'budgetItems' collection
 * @param {string} uid - to give user's collection unique id
 * @param {object} formData - data describing the budget item
 */
export const addItem = async (uid, formData) => {
	const id = formData.id;
	const userItemsRef = collection(db, `budgetItems/${uid}/items`);

	try {
		await addDoc(
			userItemsRef,
			{ id, data: { ...formData } },
			{ merge: true }
		);
		return { ...formData };
	} catch (error) {
		console.log(error);
	}
};

export const deleteItem = async (uid, documentId) => {
	try {
		const q = query(
			collection(db, `budgetItems/${uid}/items`),
			where('id', '==', documentId)
		);
		const querySnapshot = await getDocs(q);

		let docId;
		querySnapshot.forEach((doc) => {
			docId = doc.id;
		});

		const docRef = doc(db, `budgetItems/${uid}/items`, docId);

		// Delete the document
		await deleteDoc(docRef);
		return documentId;
	} catch (error) {
		console.error('Error deleting document:', error);
	}
};

/**
 * fetches a user's items base on date
 * @param {string} uid - to give user's collection unique id
 * @returns a user's items
 */
export const getAllItems = async (uid) => {
	try {
		let items = {};

		const querySnapshot = await getDocs(
			collection(db, `budgetItems/${uid}/items`)
		);

		querySnapshot.forEach((doc) => {
			const docData = doc.data();
			const {
				data: {
					id,
					billDate,
					budgetAmount,
					category,
					createdOn,
					createdOnMonthYear,
					paycheckSelect,
				},
			} = docData;

			items[id] = {
				id,
				billDate,
				budgetAmount,
				category,
				createdOn,
				createdOnMonthYear,
				paycheckSelect,
			};
		});
		return items;
	} catch (error) {
		console.log(error);
	}
};

/**
 * Updates a planner accordion's item's assigned paycheck value
 * @param {string} uid - to update the correct user's data
 * @param {string} document - document id
 * @param {string} newLocation - the newly updated paycheck for the item
 */
export const updateItemPaycheckSelect = async (uid, document, newLocation) => {
	try {
		const q = query(
			collection(db, `budgetItems/${uid}/items`),
			where('id', '==', document)
		);
		const querySnapshot = await getDocs(q);

		let docId;
		querySnapshot.forEach((doc) => {
			docId = doc.id;
		});

		const docRef = doc(db, `budgetItems/${uid}/items`, docId);
		await updateDoc(docRef, { 'data.paycheckSelect': newLocation });
	} catch (error) {
		console.log(error);
	}
};

/**
 * Updates a category accordion's item's assigned category
 * @param {string} uid - to update the correct user's data
 * @param {string} document - document id
 * @param {string} newCategory - the newly updated category for the item
 */
export const updateCategoryItem = async (uid, document, newCategory) => {
	try {
		const q = query(
			collection(db, `budgetItems/${uid}/items`),
			where('id', '==', document)
		);
		const querySnapshot = await getDocs(q);

		let docId;
		querySnapshot.forEach((doc) => {
			docId = doc.id;
		});

		const docRef = doc(db, `budgetItems/${uid}/items`, docId);
		await updateDoc(docRef, { 'data.category': newCategory });
	} catch (error) {
		console.log(error);
	}
};

// THIS WILL MAYBE REPLACE THE ABOVE ^ AND BE MORE FLEXIBLE...FOR ANY CHANGES TO THE DATA...
export const updateItem = async (uid, idToUpdate, newData) => {
	try {
		const q = query(
			collection(db, `budgetItems/${uid}/items`),
			where('id', '==', idToUpdate)
		);
		const querySnapshot = await getDocs(q);

		let docId;
		querySnapshot.forEach((doc) => {
			docId = doc.id;
		});

		const docRef = doc(db, `budgetItems/${uid}/items`, docId);

		// Get existing data
		const existingData = (await getDoc(docRef)).data();

		// Separate top-level fields and nested data fields
		const { id, data, ...rest } = existingData;

		// Create a new data object with existing and new data
		const updatedData = {
			id: newData.id,
			data: { ...data, ...newData },
			...rest,
		};

		// Update the document with the merged data
		await updateDoc(docRef, updatedData);

		// return updatedData to keep local front-end store in sync with changes
		const returnPayload = { updatedData, idToUpdate };

		return returnPayload;
	} catch (error) {
		console.log(error);
	}
};

// removed since we're not fetching items BY DATE
//  export const getAllItems = async (uid, selectedDate) => {
//   try {
//     let items = {};

//     const q = query(
//       collection(db, `budgetItems/${uid}/items`),
//       where('data.createdOnMonthYear', '==', selectedDate)
//     );

//     const querySnapshot = await getDocs(q);

//     querySnapshot.forEach((doc) => {
//       const docData = doc.data();
//       const {
//         data: {
//           id,
//           billDate,
//           budgetAmount,
//           category,
//           createdOn,
//           createdOnMonthYear,
//           paycheckSelect,
//         },
//       } = docData;

//       items[id] = {
//         id,
//         billDate,
//         budgetAmount,
//         category,
//         createdOn,
//         createdOnMonthYear,
//         paycheckSelect,
//       };
//     });
//     return items;
//   } catch (error) {
//     console.log(error);
//   }
// };
