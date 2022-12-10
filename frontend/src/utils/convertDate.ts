export function convertDate(date: string) {
  const jsDate = new Date(date);

  const day = jsDate.getDate();
  const month = jsDate.getMonth() + 1;
  const year = jsDate.getFullYear();

  return `${day}/${month}/${year}`;
}
