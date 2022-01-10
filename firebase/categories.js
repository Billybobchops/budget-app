import { db } from './firebaseClient';
import { doc, setDoc, Timestamp } from 'firebase/firestore';

/**
 * adds a category-title field to a user's doc in 'categories' collection
 * @param {string} category
 * @param {string} uid
 */
export const addCategory = async (category, uid) => {
  const userRef = doc(db, `categories/${uid}`); // creates doc with user's UID
  const docData = {
    [category]: { title: category, createdOn: Timestamp.fromDate(new Date()) },
  };

  try {
    await setDoc(userRef, docData, { merge: true });
    console.log('Category data has been written to the firestore DB.');
  } catch (error) {
    console.log(error);
  }
};
