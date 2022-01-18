import { db } from './firebaseClient';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';

/**
 * adds a category-title field to the current user's doc in 'categories' collection
 * @param {string} uid - to give user's collection unique id
 * @param {string} category title
 */
export const addCategory = async (uid, category) => {
  const userCategoriesRef = doc(db, `categories/${uid}`); // creates doc with user's UID
  const docData = {
    [category]: { title: category, createdOn: Timestamp.fromDate(new Date()) },
  };

  try {
    await setDoc(userCategoriesRef, docData, { merge: true });
    console.log('Category data has been written to the firestore DB.');
  } catch (error) {
    console.log(error);
  }
};

/**
 * fetches a user's categories
 * @param {string} id - to get user's collection
 * @returns a user's categories
 */
export const getCategories = async (uid) => {
  const userCategoriesRef = doc(db, `categories/${uid}`); // creates ref to doc with user's UID
  const docSnapshot = await getDoc(userCategoriesRef); // returns a promise that resolves to a doc snapshot

  if (docSnapshot.exists()) {
    const docData = docSnapshot.data();
    const categoriesArr = [];

    Object.values(docData).forEach((category) => {
      categoriesArr.push(category.title);
    });

    return categoriesArr;
  }
};
