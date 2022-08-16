const equipmentDateFromString = (strDate) => {
  //   const str = "09/24/2022 07:30:14";

  const [dateValues, timeValues] = strDate.split(" ");
  console.log(dateValues); // 👉️ "09/24/2022"
  console.log(timeValues); // 👉️ "07:30:14"

  const [month, day, year] = dateValues.split("/");
  const [hours, minutes, seconds] = timeValues.split(":");

  const date = new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);
  return date;

  //  👇️️ Sat Sep 24 2022 07:30:14
  console.log(date);
};

module.exports = {
  equipmentDateFromString,
};
