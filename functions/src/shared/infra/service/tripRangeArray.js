const tripRangeArray = (inicio, fim) => {
  let hour = inicio;
  const range = [];
  while (hour != (fim + 1) % 24) {
    range.push(hour);
    hour = (hour + 1) % 24;
  }
  return range;
};

module.exports = { tripRangeArray };
