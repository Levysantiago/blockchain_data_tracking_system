"use strict";

const db = require("../../services/DatabaseService");
require("dotenv").config();
const {
  MNEMONIC_WORDS,
  PROVIDER_LINK,
  SMC_ADDRESS,
  SMC_BUILD_NAME
} = process.env;

const Web3 = require("web3");
const HDWalletProvider = require("truffle-hdwallet-provider");
const provider = new HDWalletProvider(MNEMONIC_WORDS, PROVIDER_LINK);
const web3 = new Web3(provider);
const web3bridge = use("App/lib/web3bridge");
const ContractService = use("App/services/ContractService");
const EtherscanService = use("App/services/EtherscanService");
const ethservice = new EtherscanService();

class DataVisualizationController {
  /**
   * Get the measures of the sensor on its contract.
   *
   * JSON EXAMPLE
   * {
   *    "ids": "id",
   *    "sensorname": "DHT11"
   * }
   *
   * @param {Response} ctx.response
   */
  async getMeasurement({ response }) {
    const contract = await web3bridge.getContractInstance(
      SMC_ADDRESS,
      SMC_BUILD_NAME,
      web3
    );
    const contract_service = new ContractService(web3, contract);
    const temperatures = await contract_service.getTemperatures();
    const humidities = await contract_service.getHumidities();

    const json = {
      temperatures,
      humidities
    };

    response.send(JSON.stringify(json));
  }

  /**
   * Get the last measures of the sensor on its contract.
   *
   * JSON EXAMPLE
   * {
   *    "ids": "id",
   *    "sensorname": "DHT11"
   * }
   *
   * @param {Response} ctx.response
   */
  async getLastMeasurement({ response }) {
    const contract = await web3bridge.getContractInstance(
      SMC_ADDRESS,
      SMC_BUILD_NAME,
      web3
    );
    const contract_service = new ContractService(web3, contract);
    const last_measures = await contract_service.getLastMeasures();

    const json = {
      temperature: last_measures[0],
      humidity: last_measures[1]
    };

    response.send(JSON.stringify(json));
  }

  /**
   * Get the last measures of the sensor on its contract.
   *
   * JSON EXAMPLE
   * {
   *    "ids": "id",
   *    "sensorname": "DHT11"
   * }
   *
   * @param {Response} ctx.response
   */
  async getTransactions({ request, response }) {
    let { blockstart, blockend } = request.params;
    if (!blockstart && !blockend) {
      blockstart = "6281085";
      blockend = "99999999";
    }
    const transactions = await ethservice.getTransactions(blockstart, blockend);

    response.send(JSON.stringify(transactions));
  }

  async getTransactionsByLink({ request, response }) {
    const json = request.params;
    response.redirect(
      "http://localhost:3000/transactions/" +
        json.blockstart +
        "/" +
        json.blockend
    );
  }

  async getLatestTransaction({ response }) {
    const transaction = await ethservice.getLastTwoTransactions();

    response.send(JSON.stringify(transaction));
  }

  async getFermentations({ response }) {
    const fermentations = await db.selectFermentations();

    fermentations.map(f => {
      if (!f.timestamp) {
        f.blockstart = f.blockend = f.timestamp = "...";
      }
    });

    response.send(fermentations);
  }

  async getFermentation({ request, response }) {
    const fermentation = await db.getLastFermentation();

    if (!fermentation) {
      return response.status(404).send("asd");
    }

    if (!fermentation.active) {
      return response.status(204).send("asd");
    }

    return response.send(JSON.stringify(fermentation));
  }
}

module.exports = DataVisualizationController;
