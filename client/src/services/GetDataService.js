require("dotenv").config();
const {
  REACT_APP_SERVER_HOST: SERVER_HOST,
  REACT_APP_SERVER_PORT: SERVER_PORT
} = process.env;
const server_url = SERVER_HOST + ":" + SERVER_PORT;

const get_data_service = {
  getTransactions: async () => {
    let response = await fetch(server_url + "/getTransactions", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ids: "id",
        sensorname: "DHT11"
      })
    });

    return response;
  },
  getLastMeasures: async () => {
    let response = await fetch(server_url + "/getLastMeasures", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ids: "id",
        sensorname: "DHT11"
      })
    });

    return response;
  }
};

export default get_data_service;
