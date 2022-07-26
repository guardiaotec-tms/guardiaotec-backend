const fazerAGeometriaDaViagm = () => {
  while (tempoDaViagem) {
    const coordenadas = [];
    //a cada dois minutos faça
    const posição = descubraAposiçãoAgora();
    coordenadas.push(posição);
  }
  façaOUploadDeTodasAsCoordenadas();
};

googleFirebase.upload(todosOsDados);
