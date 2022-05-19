import { db } from './firebaseClient';
import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  doc,
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
    await addDoc(userItemsRef, { id, data: { ...formData } }, { merge: true });
    return { ...formData };
  } catch (error) {
    console.log(error);
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

// Add updating function here...
export const updatePlannerItem = async (uid, document, newLocation) => {
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
