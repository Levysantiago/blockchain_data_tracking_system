"use strict";

const db = require("../../services/DatabaseService");
require("dotenv").config();
const {
  MNEMONIC_WORDS,
  PROVIDER_LINK,
  SMC_ADDRESS,
  BC_ADDRESS,
  SMC_BUILD_NAME,
  GAS
} = process.env;

const Web3 = require("web3");
const HDWalletProvider = require("truffle-hdwallet-provider");
const provider = new HDWalletProvider(MNEMONIC_WORDS, PROVIDER_LINK);
const web3 = new Web3(provider);
const web3bridge = use("App/lib/web3bridge");
const ContractService = use("App/services/ContractService");
const EtherscanService = use("App/services/EtherscanService");
const ethservice = new EtherscanService();

class DataInsertionController {
  /**
   * Set the measures of a sensor on its contract.
   * POST measurements
   *
   * JSON EXAMPLE
   * {
   *    "sensorname": "DHT11",
   *    "measurements":[5, 6]
   * }
   *
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async setMeasurement({ request, response }) {
    // If there is a fermentation active
    const isActive = await db.isFermentationActive();
    if (!isActive) {
      return response.send("Fermentation did't start.");
    }

    const contract = await web3bridge.getContractInstance(
      SMC_ADDRESS,
      SMC_BUILD_NAME,
      web3
    );
    const { measurements } = request.post();

    const contract_service = new ContractService(web3, contract);

    const result = await contract_service.setTemperatureAndHumidity(
      measurements,
      BC_ADDRESS,
      GAS
    );

    if (!result) {
      return response.send(400);
    }

    const first_transaction = result.temperature;
    const last_transaction = result.humidity;
    // Obtaining the last fermentation
    let fermentation = await db.getLastFermentation();
    // Setting up the values got from the transactions
    fermentation.trxs += 2;
    fermentation.blockend = last_transaction.blockNumber;
    fermentation.timestamp = new Date().getTime();
    if (!fermentation.blockstart) {
      fermentation.blockstart = first_transaction.blockNumber;
    }
    // Updating fermentation
    let res = db.updateFermentation(
      fermentation.trxs,
      fermentation.blockstart,
      fermentation.blockend,
      fermentation.timestamp
    );
    if (!res) {
      return response.send(400);
    }

    return response.send(200);
  }

  /*
  {
    "activate": true
  }
  */
  async activateFermentation({ request, response }) {
    const json = request.params;
    json.activate = json.activate == "true";
    if (json.activate) {
      // Inserting in the database
      let res = db.insertFermentation();

      if (!res) {
        response.status(400).send("Not able to create fermentation.");
      }
    } else {
      await db.setActiveFermentation(json.activate);
      const fermentation = await db.getLastFermentation();
      // If this fermentation didn't have any transaction,
      // it's gonne be removed
      if (!fermentation.trxs) {
        await db.removeFermentation(fermentation.id);
      }
    }
    response.status(200).send("OK");
  }
}

module.exports = DataInsertionController;
