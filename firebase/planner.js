import { db } from './firebaseClient';
import {
  doc,
  setDoc,
  Timestamp,
  getDoc,
  updateDoc,
  addDoc,
} from 'firebase/firestore';

/**
 *
 * @param {string} uid - to give user's collection unique id
 * @param {object} formData - data describing the planned income
 */
export const addPlannedIncome = async (uid, formData) => {
  const key = formData.id;
  const userPlannedIncomeRef = doc(db, `plannedPaychecks/${uid}`); // creates doc with user's UID
  const docData = {
    [key]: { ...formData },
  };

  try {
    await setDoc(userPlannedIncomeRef, docData, { merge: true });
    console.log('Planned Income data has been written to the firestore DB.');
    return { ...formData };
  } catch (error) {
    console.log(error);
  }
};

/**
 * fetches a user's planned paychecks
 * @param {uid} id - to get user's collection
 * @returns a user's planned income (checks)
 */
export const getPlannedIncome = async (uid) => {
  const userPlannedIncomeRef = doc(db, `plannedPaychecks/${uid}`); // creates ref to doc with user's UID
  const docSnapshot = await getDoc(userPlannedIncomeRef);
  const paychecks = {};

  if (docSnapshot.exists()) {
    const docData = docSnapshot.data();

    Object.values(docData).forEach((check) => {
      const { id, createdOn, expectedPay, nickname } = check;
      paychecks[id] = { id, createdOn, expectedPay, nickname };
    });

    return paychecks;
  }
};

export const getPaycheckOrder = async (uid) => {
  const userPaycheckOrderRef = doc(db, `paycheckOrder/${uid}`);
  const docSnapshot = await getDoc(userPaycheckOrderRef);
  let paycheckOrder;

  if (docSnapshot.exists()) {
    const docData = docSnapshot.data();

    paycheckOrder = docData.order;
  }

  return paycheckOrder;
};

export const updatePaycheckOrderDoc = async (uid, document) => {
  const docRef = doc(db, `paycheckOrder/${uid}`);
  await updateDoc(docRef, { order: document });
};
