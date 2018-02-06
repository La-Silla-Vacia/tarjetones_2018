function getData(callback) {
  let dataExists,
    interactiveData;

  // Look if there is a global variable declared with specific data for this infographic
  try {
    if (tarjetones_2018_data) {
      dataExists = true;
      interactiveData = tarjetones_2018_data;
    }
  } catch (e) {
    dataExists = false;
  }

  // If the variable exists, and has a dataUri key, download the data
  if (dataExists) {
    if (interactiveData.dataUri) {
      fetchData(interactiveData.dataUri, (data) => {
        const formattedData = formatData(data);
        if (callback) callback(formattedData);
      });
    }
  } else {
    callback([]);
  }
}

function formatData(data) {
  return data.map((item, key) => {
    const pattern = /^((http|https|ftp):\/\/)/;
    let fotoUrl = item.AQ;
    if(!pattern.test(fotoUrl)) {
      fotoUrl = `http://archivo.lasillavacia.com/archivos/historias/candidatoscongreso2018/${item.AQ}`
    }

    return {
      id: key,
      apellido1: item.A,
      apellido2: item.B,
      nombres: item.C,
      perfilDeQuienEsQuien: item.F,
      twitter: item.G,
      votosMasRecientes: item.J,
      camara: item.M,
      genero: item.N,
      partido: item.P,
      numeroEnElTarjeton: item.Q,
      posicionIz_der1A100: item.R,
      departamento: item.S,
      subregionProvinciaOLocalidad: item.T,
      profesionUOficio: item.U,
      nivelDeEstudios: item.V,
      sectorDelQueViene: item.W,
      expertoEn: item.X,
      tieneInvestigacionesPenales: item.Y,
      haSidoCondenado: item.Z,
      haSidoDestituido: item.AA,
      haSidoCongresista: item.AB,
      periodosComoCongresista: item.AC,
      haSidoGobernador: item.AD,
      haSidoDiputado: item.AE,
      haSidoAlcalde: item.AF,
      haSidoConcejal: item.AG,
      haSidoAntesCandidatoACargosDeEleccionPopular: item.AH,
      haEstadoEnMasDeDosPartidos: item.AI,
      haOcupadoUnCargoPublico: item.AJ,
      herederoDeVotosDeCondenados: item.AK,
      herederoDeVotosDeInvestigados: item.AL,
      cuestionado: item.AM,
      tieneFamiliarEnLaPolitica: item.AN,
      esHerederoPolitico: item.AO,
      perfilito: item.AP,
      foto: fotoUrl,
      buscaReeleccion: item.AR,
      saltoCamaraSenado: item.AS,
      precandidatoQueApoyaba: item.AT,
      candidatoPresidencialQueApoya: item.AU,
      bandera1: item.AV,
      bandera2: item.AW,
      bandera3: item.AX,
      esAfro: item.AY
    }
  });
}

function fetchData(uri, callback) {
  fetch(uri)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      if (callback) callback(json);
    })
    .catch((ex) => {
      console.log('parsing failed', ex)
    })
}

export default getData;