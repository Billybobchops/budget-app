import { db } from './firebaseClient';
import { doc, setDoc, Timestamp, getDoc } from 'firebase/firestore';

/**
 *
 * @param {string} uid - to give user's collection unique id
 * @param {object} formData - data describing the planned income
 */
export const addPlannedIncome = async (uid, formData) => {
  const title = formData.title;
  const userPlannedIncomeRef = doc(db, `plannedPaychecks/${uid}`); // creates doc with user's UID
  const docData = {
    [title]: {
      ...formData,
      createdOn: Timestamp.fromDate(new Date()),
    },
  };

  try {
    await setDoc(userPlannedIncomeRef, docData, { merge: true });
    console.log('Planned Income data has been written to the firestore DB.');
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

  if (docSnapshot.exists()) {
    const docData = docSnapshot.data();
    const paycheckArr = [];

    Object.values(docData).forEach((check) => {
      paycheckArr.push(check);
    });

    return paycheckArr;
  }
};
