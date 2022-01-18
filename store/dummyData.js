const dummyData = {
  categories: ['Needs', 'Saving', 'Giving', 'Wants'],

  budgetItems: [
    {
      title: 'Date Night',
      category: 'Wants',
      billDate: '09.29.21',
      plannedPaycheck: 'Paycheck 1 Test',
      budgetAmount: 50,
    },
    {
      title: 'Spotify',
      category: 'Wants',
      billDate: '09.29.21',
      plannedPaycheck: 'Paycheck 1 Test',
      budgetAmount: 13,
    },
    {
      title: 'Groceries',
      category: 'Needs',
      billDate: '09.29.21',
      plannedPaycheck: 'Paycheck 1 Test',
      budgetAmount: 200,
    },
    {
      title: 'Utilities',
      category: 'Needs',
      billDate: '09.29.21',
      plannedPaycheck: 'Paycheck 2 Test',
      budgetAmount: 200,
    },
    {
      title: 'Gas',
      category: 'Needs',
      billDate: '09.29.21',
      plannedPaycheck: 'Paycheck 2 Test',
      budgetAmount: 80,
    },
  ],

  dummyPaychecks: [
    {
      title: 'Paycheck 1 Test',
      nickname: 'Test Nickname B1',
      expectedPay: 700,
    },
    {
      title: 'Paycheck 2 Test',
      nickname: 'Test Nickname K1',
      expectedPay: 850,
    },
    {
      title: 'Paycheck 3 Test',
      nickname: 'Test Nickname B2',
      expectedPay: 700,
    },
  ],
};

export default dummyData;
