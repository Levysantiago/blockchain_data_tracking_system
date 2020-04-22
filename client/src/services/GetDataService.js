require("dotenv").config();
const {
  REACT_APP_SERVER_HOST: SERVER_HOST,
  REACT_APP_SERVER_PORT: SERVER_PORT,
  REACT_APP_CLIENT_HOST: CLIENT_HOST,
  REACT_APP_CLIENT_PORT: CLIENT_PORT
} = process.env;
const server_url = SERVER_HOST + ":" + SERVER_PORT;
const client_url = CLIENT_HOST + ":" + CLIENT_PORT;

const json = {
  idm: "lif-gateway",
  idapp: "iot-cocoa"
};

const get_data_service = {
  external_route: id => {
    return client_url + "/external/transactions/" + id;
  },

  getTransactions: async () => {
    let response = await fetch(server_url + "/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...json,
        type: "r",
        route: "/transactions"
      })
    });

    return response;
  },

  getTransactionsByFermentation: async id => {
    let response = await fetch(server_url + "/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...json,
        type: "r",
        route: "/transactions/" + id
      })
    });

    return response;
  },

  getLastMeasures: async () => {
    let response = await fetch(server_url + "/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...json,
        type: "r",
        route: "/measures",
        headers: {
          ids: "id",
          sensorname: "DHT11"
        }
      })
    });

    return response;
  },

  getMeasures: async fermentation_id => {
    let response = await fetch(server_url + "/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...json,
        type: "r",
        route: "/measures/" + fermentation_id,
        headers: {
          ids: "id",
          sensorname: "DHT11"
        }
      })
    });

    return response;
  },

  getFermentations: async () => {
    let response = await fetch(server_url + "/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...json,
        type: "r",
        route: "/fermentations"
      })
    });

    return response;
  },

  getFermentation: async () => {
    let response = await fetch(server_url + "/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...json,
        type: "r",
        route: "/fermentation"
      })
    });

    return response;
  }
};

export default get_data_service;
