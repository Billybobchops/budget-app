import { db } from './firebaseClient';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';

/**
 * adds a sinking fund item to the current user's doc in the 'fundItems' subcollection
 * of the 'sinkingFunds' collection
 * @param {string} uid - to give user's collection unique id
 * @param {object} formData - data describing the sinking fund item
 */
export const addFund = async (uid, formData) => {
  const key = formData.id;
  const userFundsRef = doc(db, `sinkingFunds/${uid}/fundItems/${key}`);
  const docData = {
    [key]: { ...formData },
  };

  try {
    await setDoc(userFundsRef, docData, { merge: true });
    return { ...formData };
  } catch (error) {
    console.log(error);
  }
};

/**
 * fetches a user's sinking fund items
 * @param {string} id - to get user's collection
 * @returns a users sinking funds
 */
export const getFunds = async (uid) => {
  const funds = {};
  const querySnapshot = await getDocs(
    collection(db, `sinkingFunds/${uid}/fundItems`)
  );

  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    const {
      [doc.id]: { id, createdOn, timeType, timePeriod, totalAmount, billDate },
    } = docData;

    funds[doc.id] = {
      id,
      createdOn,
      timeType,
      timePeriod,
      totalAmount,
      billDate,
    };
  });

  return funds;
};
