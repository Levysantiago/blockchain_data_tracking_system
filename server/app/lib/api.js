const axios = use("axios");
require("dotenv").config();
const { HOST, PORT } = process.env;

const api = axios.create({
  baseURL: "http://" + HOST + ":" + PORT,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

module.exports = api;
