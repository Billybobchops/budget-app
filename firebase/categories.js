import { db } from './firebaseClient';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

/**
 * adds a category-title field to the current user's doc in 'categories' collection
 * and adds category to the categoryOrder collection
 * @param {string} uid - to give user's collection unique id
 * @param {string} category title
 */
export const addCategory = async (uid, formData) => {
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
 * adds a newly created category to the end of the categoryOrder array
 * @param {string} uid - to give categoryOrder a user's unique id
 * @param {string} newCategory - the newCategory title string
 */
export const addOneToCategoryOrder = async (uid, newCategory) => {
  try {
    const orderRef = doc(db, `categoryOrder/${uid}`);

    await updateDoc(orderRef, {
      order: arrayUnion(newCategory),
    });

		return newCategory;
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

/**
 * fetches the order of a user's categories
 * @param {string} uid - to get user's collection
 * @returns the order of a user's categories in an array
 */
export const getCategoryOrder = async (uid) => {
  const userCategoryOrderRef = doc(db, `categoryOrder/${uid}`); // creates ref to doc with user's UID
  const docSnapshot = await getDoc(userCategoryOrderRef); // returns a promise that resolves to a doc snapshot
  const categoryOrder = [];

  if (docSnapshot.exists()) {
    const docData = docSnapshot.data();
    const { order } = docData;
    categoryOrder = order;
  }
  return categoryOrder;
};
