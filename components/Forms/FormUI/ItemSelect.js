// custom budget items dropdown
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../../firebase/firebaseClient';
import { getDocs, collection } from 'firebase/firestore';
import classes from './SearchInput.module.css';
import customStyles from '../formUtils/reactSelectStyles';
import Select from 'react-select';

const ItemSelect = ({
  id,
  label,
  name,
  placeholder,
  value,
  errorMessage,
  isValid,
  handleChange,
  layout,
}) => {
  const columns = `${layout}`;

  const [user, setUser] = useState(null);
  const [options, setOptions] = useState({
    id: 'itemSelect',
    category: null,
    value: 'loading...',
    label: 'loading...',
  });

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        setUser(uid);
      }
    });

    const loadOptions = async () => {
      const itemsArr = [];
      const querySnapshot = await getDocs(
        collection(db, `budgetItems/${user}/items`)
      );

      // configure data to work with AsyncSelect format
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        const { [doc.id]: { category: category } } = docData;

        itemsArr.push({
          id: 'itemSelect',
          label: doc.id,
          value: doc.id,
          category,
        });
      });
      setOptions(itemsArr);
    };
    loadOptions();
  }, [user]);

  return (
    <div className={layout ? classes[columns] : ''}>
      <label className={classes.label}>{label}</label>
      <Select
        defaultOptions={true}
        cacheOptions={true}
        options={options}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        styles={customStyles}
        placeholder={placeholder}
      />
    </div>
  );
};

export default ItemSelect;
