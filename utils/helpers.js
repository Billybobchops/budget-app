export const formatItemDate = (dateString) => {
  if (!dateString) return;
  const itemDate = `${dateString.slice(-5).replace('-', '/')}`;
  return itemDate;
};

export const formatDate = (dateString) => {
  if (!dateString) return;

  const year = dateString.slice(0, 4);
  const dayAndMonth = dateString.slice(-5);
  const completeDate = `${dayAndMonth}-${year}`;

  return completeDate;
};

export const generateMonthYear = () => {
  const monthNums = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };
  const monthString = new Date().toLocaleString('default', { month: 'long' });
  const monthNum = monthNums[monthString.slice(0, 3)];
  const year = new Date().getFullYear();

  const monthYear = `${monthNum}/${year}`;
  return monthYear;
};
