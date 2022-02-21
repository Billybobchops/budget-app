import { db } from './firebaseClient';
import { addDoc, getDocs, collection, query, where } from 'firebase/firestore';

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
 * @param {string} currentDate - retrieve only this month's expenses
 * @returns a users expense items for the current month
 */
export const getExpenses = async (uid, currentDate) => {
  try {
    let expenses = {};

    const q = query(
      collection(db, `expenseItems/${uid}/items`),
      where('data.createdOnMonthYear', '==', currentDate)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      const {
        data: {
          title,
          category,
          amount,
          billDate,
          createdOn,
          createdOnMonthYear,
          expense,
        },
      } = docData;

      // normalize it when reading it in from DB
      // id overwrites id: Date.now() in ExpenseForm.js
      expenses[doc.id] = {
        id: doc.id,
        title,
        category,
        amount,
        billDate,
        createdOn,
        createdOnMonthYear,
        expense,
      };
    });

    return expenses;
  } catch (error) {
    console.log(error);
  }
};

// /**
//  * fetches a user's expense items
//  * @param {string} id - to get user's collection
//  * @returns a users expense items
//  */
// export const getExpenses = async (uid) => {
//   const expenses = {};
//   const querySnapshot = await getDocs(
//     collection(db, `expenseItems/${uid}/items`)
//   );

//   querySnapshot.forEach((doc) => {
//     const docData = doc.data();

//     const {
//       data: {
//         title,
//         amount,
//         billDate,
//         createdOn,
//         createdOnMonthYear,
//         expense,
//         nickname,
//         plannedPaycheck,
//       },
//     } = docData;

//     // normalize it when reading it in from DB
//     // id overwrites id: Date.now() in ExpenseForm.js
//     expenses[doc.id] = {
//       id: doc.id,
//       title,
//       amount,
//       billDate,
//       createdOn,
//       createdOnMonthYear,
//       expense,
//       nickname,
//       plannedPaycheck,
//     };
//   });

//   return expenses;
// };
