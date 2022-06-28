const { db } = require("../../../shared/infra/database/firebase");

const findTripTimeRange = async (vinculo, transpId) => {
  const itineraryLines = await db
    .collection(`companies/${transpId}/itineraries`)
    .where("LTU Correspondente", "==", vinculo["Plano de Viagem"])
    .get()
    .then((qs) => {
      const lines = [];
      qs.forEach((doc) => {
        lines.push(doc.data());
      });
      return lines;
    });
  const sorted = itineraryLines.sort((i1, i2) => {
    try {
      return i1.Chegada.toDate().getTime() - i2.Chegada.toDate().getTime();
    } catch (error) {
      console.log(transpId);
      if (i1.Chegada) return -1;
      else return 1;
    }
  });

  const horarioInicio = sorted[0].Chegada.toDate();
  const horarioFim = sorted[sorted.length - 1].Partida.toDate();
  return { horarioFim, horarioInicio };
  //   return itineraryLines;
};

module.exports = {
  findTripTimeRange,
};
