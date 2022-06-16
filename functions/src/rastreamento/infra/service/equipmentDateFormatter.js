const equipmentDateFormatter = (date) => {
  const [days, hours] = date.split(" ");
  const [year, month, day] = days.split("/");
  const [hour, minutes] = hours.split(":");
  return `${day}${month}${year} ${hour}:${minutes}:00`;
};

module.exports = { equipmentDateFormatter };
