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
    // Commented for testing
    // await contract_service.setTemperatureAndHumidity(
    //   measurements,
    //   BC_ADDRESS,
    //   GAS
    // );

    // Getting the last two transactions
    const last_transactions = await ethservice.getLastTwoTransactions();

    let fermentation = await db.getLastFermentation();
    fermentation.trxs += last_transactions.length;
    fermentation.blockend = last_transactions[0].blockNumber;
    fermentation.timestamp = last_transactions[0].timeStamp;
    if (!fermentation.blockstart) {
      fermentation.blockstart = last_transactions[1].blockNumber;
    }
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
    }
    response.status(200).send("OK");
  }
}

module.exports = DataInsertionController;
