import { db } from './firebaseClient';
import { doc, getDoc, setDoc } from 'firebase/firestore';

/**
 * adds a category-title field to the current user's doc in 'categories' collection
 * @param {string} uid - to give user's collection unique id
 * @param {string} category title
 */
export const addCategory = async (uid, formData) => {
  console.log(formData);
  const key = formData.id;
  const userCategoriesRef = doc(db, `categories/${uid}`); // creates doc with user's UID
  const docData = {
    [key]: { ...formData },
  };

  try {
    await setDoc(userCategoriesRef, docData, { merge: true });
    return { ...formData };
  } catch (error) {
    console.log(error);
  }
};

/**
 * fetches a user's categories
 * @param {string} uid - to get user's collection
 * @returns a user's categories
 */
export const getAllCategories = async (uid) => {
  const userCategoriesRef = doc(db, `categories/${uid}`); // creates ref to doc with user's UID
  const docSnapshot = await getDoc(userCategoriesRef); // returns a promise that resolves to a doc snapshot
  const categories = {};

  if (docSnapshot.exists()) {
    const docData = docSnapshot.data();

    Object.values(docData).forEach((category) => {
      const { id, createdOn, createdOnMonthYear } = category;
      categories[id] = { id, createdOn, createdOnMonthYear };
    });
  }

  return categories;
};
