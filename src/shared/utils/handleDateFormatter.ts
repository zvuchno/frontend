export const handleDateFormatter = (value: string) => {
  const formatedValue = value.replace(/\D/g, "").slice(0, 8);

  const day = formatedValue.slice(0, 2);
  const month = formatedValue.slice(2, 4);
  const year = formatedValue.slice(4, 8);

  let dateValue = day;
  if (month) {
    dateValue += `.${month}`;
  }
  if (year) {
    dateValue += `.${year}`;
  }

  return dateValue;
};
