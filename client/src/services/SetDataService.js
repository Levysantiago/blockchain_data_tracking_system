const helpers = require("../lib/helpers");
require("dotenv").config();

const {
  REACT_APP_SERVER_HOST: SERVER_HOST,
  REACT_APP_SERVER_PORT: SERVER_PORT
} = process.env;

const server_url = SERVER_HOST + ":" + SERVER_PORT;

const json = {
  idm: "lif-gateway",
  idapp: "iot-cocoa"
};

const set_data_service = {
  setActivateFermentation: async bol_value => {
    const response = await fetch(server_url + "/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...json,
        type: "w",
        route: "/fermentation",
        timestamp: helpers.getTimestamp(),
        body: {
          activate: bol_value
        }
      })
    });

    return response;
  }
};

export default set_data_service;
