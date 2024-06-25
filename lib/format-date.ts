export const formatDate = (currentFormat: string): string => {
  const dateString = currentFormat;
  // Convert the string to a Date object
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Month is 0/indexed
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);
  // Create the formatted date string
  // const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
};
