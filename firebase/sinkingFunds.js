import { db } from './firebaseClient';
import { doc, setDoc, Timestamp, getDoc } from 'firebase/firestore';

/**
 * adds a sinking fund item to the current user's doc in the 'fundItems' subcollection
 * of the 'sinkingFunds' collection
 * @param {string} uid - to give user's collection unique id
 * @param {object} formData - data describing the sinking fund item
 */
export const addFund = async (uid, formData) => {
  const title = formData.title;
  const userFundsRef = doc(db, `sinkingFunds/${uid}/fundItems/${title}`);
  const docData = {
    [title]: {
      ...formData,
      createdOn: Timestamp.fromDate(new Date()),
    },
  };

  try {
    await setDoc(userFundsRef, docData, { merge: true });
  } catch (error) {
    console.log(error);
  }
};
