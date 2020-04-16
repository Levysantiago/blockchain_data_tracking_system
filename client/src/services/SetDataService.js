require("dotenv").config();

const {
  REACT_APP_SERVER_HOST: SERVER_HOST,
  REACT_APP_SERVER_PORT: SERVER_PORT
} = process.env;

const server_url = SERVER_HOST + ":" + SERVER_PORT;

const set_data_service = {
  setActivateFermentation: async bol_value => {
    const response = await fetch(server_url + "/fermentation/" + bol_value, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });

    return response;
  }
};

export default set_data_service;
