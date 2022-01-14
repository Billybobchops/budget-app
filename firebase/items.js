import { db } from './firebaseClient';
import { doc, setDoc, Timestamp, getDoc } from 'firebase/firestore';

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
