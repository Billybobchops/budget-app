import { db } from './firebaseClient';
import { doc, setDoc, Timestamp, getDoc } from 'firebase/firestore';

/**
 * adds an expense itme to current user's doc in the 'items' subcollection
 * of the 'expenseItems' collection
 * @param {string} uid - to give user's collection unique id
 * @param {object} formData - data describing the expense/income item
 */
export const addExpense = async (uid, formData) => {
  const title = formData.title;
  const userExpenseRef = doc(db, `expenseItems/${uid}/items/${title}`);
  const docData = {
    [title]: {
      ...formData,
      createdOn: Timestamp.fromDate(new Date()),
    },
  };

  try {
    await setDoc(userExpenseRef, docData, { merge: true });
    console.log(`Data successfully written to Firestore.`);
  } catch (error) {
    console.log(error);
  }
};
