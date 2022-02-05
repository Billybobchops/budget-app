import { db } from './firebaseClient';
import {
  doc,
  setDoc,
  Timestamp,
  getDocs,
  collection,
} from 'firebase/firestore';

/**
 * adds a budget item to the current user's doc in the 'items' subcollection
 * of the 'budgetItems' collection
 * @param {string} uid - to give user's collection unique id
 * @param {object} formData - data describing the budget item
 */
export const addItem = async (uid, formData) => {
  const key = formData.id;
  const userItemsRef = doc(db, `budgetItems/${uid}/items/${key}`);
  const docData = {
    [key]: {
      ...formData,
    },
  };

  try {
    await setDoc(userItemsRef, docData, { merge: true });
    console.log('Budget item has been written to the firestore DB.');
    return { ...formData }; // previously docData
  } catch (error) {
    console.log(error);
  }
};

/**
 * fetches a user's items
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
        [doc.id]: {
          id,
          title,
          billDate,
          budgetAmount,
          category,
          createdOn,
          paycheckSelect,
        },
      } = docData;

      items[doc.id] = {
        id,
        title,
        billDate,
        budgetAmount,
        category,
        createdOn,
        paycheckSelect,
      };
    });
    return items;
  } catch (error) {
    console.log(error);
  }
};
