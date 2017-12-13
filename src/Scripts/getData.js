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
        if (callback) callback(data);
      });
    }
  } else {
    callback([]);
  }
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