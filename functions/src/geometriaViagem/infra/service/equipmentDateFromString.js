const equipmentDateFromString = (strDate) => {
  //   const str = "09/24/2022 07:30:14";

  const [dateValues, timeValues] = strDate.split(" ");
  //   console.log(dateValues); // 👉️ "09/24/2022"
  //   console.log(timeValues); // 👉️ "07:30:14"

  //   const [year, month, day] = dateValues.split("/");
  const day = dateValues.substring(0, 2);
  const month = dateValues.substring(2, 4);
  const year = dateValues.substring(4);

  const [hours, minutes, seconds] = timeValues.split(":");

  //   console.log(
  //     Number(year),
  //     Number(month - 1),
  //     Number(day - 1),
  //     Number(hours),
  //     Number(minutes),
  //     Number(seconds)
  //   );

  const date = new Date(
    Number(year),
    Number(month - 1),
    Number(day - 1),
    Number(hours),
    Number(minutes),
    Number(seconds)
  );
  return date;

  //  👇️️ Sat Sep 24 2022 07:30:14
  console.log(date);
};

// const str = "2022/05/25 22:46:27";
// console.log(equipmentDateFromString(str));

module.exports = {
  equipmentDateFromString,
};
