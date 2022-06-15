const getCurrentDayOfWeek = () => {
  const dayOfWeekName = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    weekday: "long",
  });

  return dayOfWeekName;
};

const weekDayMap = {
  "segunda-feira": "Seg",
  "terça-feira": "Ter",
  "quarta-feira": "Qua",
  "quinta-feira": "Qui",
  "sexta-feira": "Sex",
  sábado: "Sab",
  domingo: "Dom",
};

module.exports = {
  getCurrentDayOfWeek,
  weekDayMap,
};
