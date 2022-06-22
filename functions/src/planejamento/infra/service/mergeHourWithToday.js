const mergeHourWithToday = (date) => {
  //   let date1 = new Date().toLocaleString("pt-BR", {
  //     timeZone: "America/Sao_Paulo",
  //   });
  const spDate = new Date();
  let day = spDate.getDate();
  let month = spDate.getMonth();
  let year = spDate.getFullYear();
  const a = new Date(date);
  a.setDate(day);
  a.setMonth(month);
  a.setFullYear(year);
  return a;
};

module.exports = { mergeHourWithToday };
