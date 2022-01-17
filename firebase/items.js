import { db } from './firebaseClient';
import { doc, setDoc, Timestamp, getDocs } from 'firebase/firestore';

/**
 * adds a budget item to the current user's doc in the 'items' subcollection
 * of the 'budgetItems' collection
 * @param {string} uid - to give user's collection unique id
 * @param {object} formData - data describing the budget item
 */
export const addItem = async (uid, formData) => {
  const title = formData.title;
  const userItemsRef = doc(db, `budgetItems/${uid}/items/${title}`);
  const docData = {
    [title]: {
      ...formData,
      createdOn: Timestamp.fromDate(new Date()),
    },
  };

  try {
    await setDoc(userItemsRef, docData, { merge: true });
    console.log('Budget item has been written to the firestore DB.');
  } catch (error) {
    console.log(error);
  }
};

/**
 * fetches a user's items
 * @param {string} uid - to get user's collection
 * @returns a user's items
 */
// export const getAllItems = async (uid) => {
//   const userItemsRef = doc(db, `budgetItems/${uid}/items`); // creates ref to doc with user's UID
//   const mySnapshot = await getDocs(userItemsRef);

//   if (mySnapshot.exists()) {
//     const docsData = mySnapshot.data();
//     console.log(docsData);
//   }
// };
