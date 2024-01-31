const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#D4F3DA' : null,
    color: '#2d8058',
    fontFamily: '"Mukta", sans-serif',
    fontWeight: 700,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#2d8058',
  }),
  control: (provided, state) => ({
    ...provided,
    color: '#2d8058',
    borderRadius: '0px',
    minHeight: '50px',
    padding: '0 0 0 14px',
    margin: '10px 0 10px 0',
    fontSize: '15px',
    fontFamily: '"Mukta", sans-serif',
    fontWeight: 700,
    transition: 0,
    border: state.isFocused ? '1px solid #04311c' : '1px solid #2d8058',
    '&:hover': {
      borderLeft: '3px solid #2d8058',
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#2d8058',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#757575',
    fontFamily: '"Mukta", sans-serif',
    fontWeight: 600,
  }),
  input: (provided) => ({
    ...provided,
    color: '#2d8058',
    fontFamily: '"Mukta", sans-serif',
    fontWeight: 700,
  }),
};

export default customStyles;
