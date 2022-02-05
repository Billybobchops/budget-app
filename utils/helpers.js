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
