require("dotenv").config();
const {
  REACT_APP_SERVER_HOST: SERVER_HOST,
  REACT_APP_SERVER_PORT: SERVER_PORT,
  REACT_APP_CLIENT_HOST: CLIENT_HOST,
  REACT_APP_CLIENT_PORT: CLIENT_PORT
} = process.env;
const server_url = SERVER_HOST + ":" + SERVER_PORT;
const client_url = CLIENT_HOST + ":" + CLIENT_PORT;

const get_data_service = {
  external_route: (blockstart, blockend) => {
    return client_url + "/transactions/" + blockstart + "/" + blockend;
  },

  getTransactions: async (blockstart, blockend) => {
    let json = {
      ids: "id",
      sensorname: "DHT11"
    };
    if (blockstart && blockend) {
      json["blockstart"] = blockstart;
      json["blockend"] = blockend;
    }
    let response = await fetch(server_url + "/getTransactions", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(json)
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
  },

  getFermentations: async () => {
    let response = await fetch(server_url + "/fermentations", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });

    return response;
  },

  getFermentation: async () => {
    let response = await fetch(server_url + "/fermentation", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });

    return response;
  }
};

export default get_data_service;
