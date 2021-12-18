const dummyData = {
  categories: [
    { title: 'Needs' },
    { title: 'Saving' },
    { title: 'Giving' },
    { title: 'Wants' },
  ],

  budgetItems: [
    {
      title: 'Date Night',
      category: 'Wants',
      billDate: '09.29.21',
      plannedPaycheck: 'Paycheck 1',
      budgetAmount: 50,
    },
    {
      title: 'Spotify',
      category: 'Wants',
      billDate: '09.29.21',
      plannedPaycheck: 'Paycheck 1',
      budgetAmount: 13,
    },
    {
      title: 'Groceries',
      category: 'Needs',
      billDate: '09.29.21',
      plannedPaycheck: 'Paycheck 1',
      budgetAmount: 200,
    },
    {
      title: 'Utilities',
      category: 'Needs',
      billDate: '09.29.21',
      plannedPaycheck: 'Paycheck 2',
      budgetAmount: 200,
    },
    {
      title: 'Gas',
      category: 'Needs',
      billDate: '09.29.21',
      plannedPaycheck: 'Paycheck 2',
      budgetAmount: 80,
    },
  ],

  dummyPaychecks: [
    {
      title: 'Paycheck 1',
      nickname: 'Test Nickname B1',
      expectedPay: 700,
    },
    {
      title: 'Paycheck 2',
      nickname: 'Test Nickname K1',
      expectedPay: 850,
    },
    {
      title: 'Paycheck 3',
      nickname: 'Test Nickname B2',
      expectedPay: 700,
    },
    {
      title: 'Paycheck 4',
      nickname: 'Test Nickname K2',
      expectedPay: 850,
    },
  ],
};

export default dummyData;
