export const formatDate = (dateString) => {
  if (!dateString) return;
  
  const year = dateString.slice(0, 4);
  const dayAndMonth = dateString.slice(-5);
  // const dayAndMonth = dateString.slice(-5).replace('-', '.');
  const completeDate = `${dayAndMonth}-${year}`;

  return completeDate;
};

// export const formatNum = (num) => {

// };