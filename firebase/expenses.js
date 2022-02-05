import { db } from './firebaseClient';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';

/**
 * adds an expense itme to current user's doc in the 'items' subcollection
 * of the 'expenseItems' collection
 * @param {string} uid - to give user's collection unique id
 * @param {object} formData - data describing the expense/income item
 */
export const addExpense = async (uid, formData) => {
  const key = formData.id;
  const userExpenseRef = doc(db, `expenseItems/${uid}/items/${key}`);
  const docData = {
    [key]: { ...formData },
  };

  try {
    await setDoc(userExpenseRef, docData, { merge: true });
    return { ...formData };
  } catch (error) {
    console.log(error);
  }
};

/**
 * fetches a user's expense items
 * @param {string} id - to get user's collection
 * @returns a users expense items
 */
export const getExpenses = async (uid) => {
  const expenses = {};
  const querySnapshot = await getDocs(
    collection(db, `expenseItems/${uid}/items`)
  );

  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    const {
      [doc.id]: {
        id,
        amount,
        billDate,
        createdOn,
        expense,
        nickname,
        plannedPaycheck,
      },
    } = docData;

    expenses[doc.id] = {
      id,
      amount,
      billDate,
      createdOn,
      expense,
      nickname,
      plannedPaycheck,
    };
  });

  return expenses;
};
