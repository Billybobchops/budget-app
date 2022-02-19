import { db } from './firebaseClient';
import { addDoc, getDocs, collection } from 'firebase/firestore';

/**
 * adds an expense itme to current user's doc in the 'items' subcollection
 * of the 'expenseItems' collection
 * @param {string} uid - to give user's collection unique id
 * @param {object} formData - data describing the expense/income item
 */
export const addExpense = async (uid, formData) => {
  const id = formData.id;
  const userExpenseRef = collection(db, `expenseItems/${uid}/items`);

  try {
    await addDoc(
      userExpenseRef,
      // { id, data: { ...formData } },
      { data: { ...formData } },
      { merge: true }
    );
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
      data: {
        title,
        amount,
        billDate,
        createdOn,
        createdOnMonthYear,
        expense,
        nickname,
        plannedPaycheck,
      },
    } = docData;

    // normalize it after reading it in from DB
    // id overwrites id: serverTimestamp 
    expenses[doc.id] = {
      id: doc.id,
      title,
      amount,
      billDate,
      createdOn,
      createdOnMonthYear,
      expense,
      nickname,
      plannedPaycheck,
    };
  });
  
  return expenses;
};
