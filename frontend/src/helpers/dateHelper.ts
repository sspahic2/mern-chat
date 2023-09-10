const converStringToDate = (date: string) => {
  return new Date(date);
};

const pretifyDate = (date: Date) => {
  return `${date.getDate()}/${date.getMonth() + 1} ${date.toLocaleTimeString()}`;
}

export { converStringToDate, pretifyDate }