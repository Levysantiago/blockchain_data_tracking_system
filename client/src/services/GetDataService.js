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
  external_route: id => {
    return client_url + "/external/transactions/" + id;
  },

  getTransactions: async () => {
    let json = {
      idm: "id",
      idt: "0000000000000000",
      type: "R",
      timestamp: "1519746632"
    };
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

  getTransactionsByFermentation: async id => {
    let json = {
      ids: "id",
      sensorname: "DHT11",
      fermentation_id: id
    };
    let response = await fetch(server_url + "/getTransactions/id", {
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

  getMeasures: async fermentation_id => {
    let response = await fetch(server_url + "/getMeasures", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ids: "id",
        sensorname: "DHT11",
        fermentation_id: fermentation_id
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
