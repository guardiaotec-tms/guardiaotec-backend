const getCurrentHour = () => {
  const currentHour = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
  });

  return currentHour;
};

module.exports = {
  getCurrentHour,
};
