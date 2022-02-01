import { db } from './firebaseClient';
import {
  doc,
  setDoc,
  Timestamp,
  getDocs,
  collection,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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
export const getAllItems = async () => {
  try {
    const auth = getAuth();
    const items = {};

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;

        const querySnapshot = await getDocs(
          collection(db, `budgetItems/${uid}/items`)
        );

        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          const {
            [doc.id]: {
              title,
              billDate,
              budgetAmount,
              category,
              // createdOn,
              paycheckSelect,
            },
          } = docData;

          items[doc.id] = {
            id: doc.id,
            title,
            billDate,
            budgetAmount,
            category,
            // createdOn,
            paycheckSelect,
          };
        });
      }
    });
    return items;
  } catch (error) {
    console.log(error);
  }
};
