// custom category dropdown
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../../firebase/firebaseClient';
import { doc, getDoc } from 'firebase/firestore';
import classes from './SearchInput.module.css';
import customStyles from '../formUtils/reactSelectStyles';
import Select from 'react-select';

const CategorySelect = ({
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
    id: 'categorySelect',
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
      const userCategoriesRef = doc(db, `categories/${user}`); // creates ref to doc with user's UID
      const docSnapshot = await getDoc(userCategoriesRef); // returns a promise that resolves to a doc snapshot

      if (docSnapshot.exists()) {
        const docData = docSnapshot.data();
        const categoriesArr = [];

        // configure data to work with AsyncSelect format
        Object.values(docData).forEach((category) => {
          categoriesArr.push({
            id: 'categorySelect',
            value: category.title,
            label: category.title,
          });
        });

        setOptions(categoriesArr);
      }
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

export default CategorySelect;
