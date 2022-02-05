export const formatItemDate = (dateString) => {
  if (!dateString) return;
  const itemDate = `${dateString.slice(-5).replace('-', '/')}`;
  return itemDate;
};

export const formatSFDate = (dateString) => {
  if (!dateString) return;

  const year = dateString.slice(0, 4);
  const dayAndMonth = dateString.slice(-5);
  // const dayAndMonth = dateString.slice(-5).replace('-', '.');
  const completeDate = `${dayAndMonth}-${year}`;

  return completeDate;
};
