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
   *    "fermentation_id": "1"
   * }
   *
   * @param {Response} ctx.response
   */
  async getMeasurement({ request, response }) {
    const { fermentation_id } = request.all();

    if (!fermentation_id) {
      return response.send(400);
    }

    const is_id_valid = await db.isValidId(fermentation_id);
    if (!is_id_valid) {
      return response.send(400);
    }

    const contract = await web3bridge.getContractInstance(
      SMC_ADDRESS,
      SMC_BUILD_NAME,
      web3
    );
    const contract_service = new ContractService(web3, contract);

    const temperatures = await contract_service.getTemperatures(
      fermentation_id
    );
    const humidities = await contract_service.getHumidities(fermentation_id);

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

    // Obtaining the last fermentation
    let fermentation = await db.getLastFermentation();

    const contract_service = new ContractService(web3, contract);
    const last_measures = await contract_service.getLastMeasures(
      fermentation.id
    );

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
    const blockstart = "6355663";
    const blockend = "99999999";

    const transactions = await ethservice.getTransactions(
      web3,
      blockstart,
      blockend
    );

    response.send(JSON.stringify(transactions));
  }

  /**
   * Get the last measures of the sensor on its contract.
   *
   * JSON EXAMPLE
   * {
   *    "ids": "id",
   *    "sensorname": "DHT11",
   *    "fermentation_id": "1"
   * }
   *
   * @param {Response} ctx.response
   */
  async getTransactionsByFermentation({ request, response }) {
    let { fermentation_id } = request.all();

    const fermentation = await db.getFermentation(fermentation_id);

    let { blockstart, blockend } = fermentation;

    if (!blockstart && !blockend) {
      response.send([]);
    } else {
      const transactions = await ethservice.getTransactions(
        web3,
        blockstart,
        blockend
      );

      response.send(JSON.stringify(transactions));
    }
  }

  async getLatestTransaction({ response }) {
    const transaction = await ethservice.getLastTwoTransactions();

    response.send(JSON.stringify(transaction));
  }

  async getFermentations({ response }) {
    const fermentations = await db.selectFermentations();

    let i = 0;
    fermentations.map(f => {
      if (!f.timestamp) {
        f.blockstart = f.blockend = f.timestamp = "...";
      }
      f.list_id = i++;
    });

    response.send(fermentations);
  }

  async getFermentation({ request, response }) {
    const fermentation = await db.getLastFermentation();

    if (!fermentation) {
      return response.status(404).send("No fermentation found");
    }

    return response.send(JSON.stringify(fermentation));
  }
}

module.exports = DataVisualizationController;
