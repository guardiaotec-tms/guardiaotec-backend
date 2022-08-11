const tripRangeArray = (inicio, fim) => {
  const range = [];
  if ([0, 1, 2].includes(fim)) fim = 23;
  for (let hour = inicio; hour < fim + 1; hour += 1) {
    range.push(hour);
  }
  return range;
};

module.exports = { tripRangeArray };
