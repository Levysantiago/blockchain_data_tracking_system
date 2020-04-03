"use strict";

const Web3 = require("web3");
require("dotenv").config();
const HDWalletProvider = require("truffle-hdwallet-provider");
const {
  MNEMONIC_WORDS,
  PROVIDER_LINK,
  SMC_ADDRESS,
  SMC_BUILD_NAME,
  GAS
} = process.env;
const provider = new HDWalletProvider(MNEMONIC_WORDS, PROVIDER_LINK);
const web3 = new Web3(provider);
const web3bridge = use("App/lib/web3bridge");
const ContractService = use("App/services/ContractService");

class DataInsertionController {
  /**
   * Set the measures of a sensor on its contract.
   * POST measurements
   *
   * JSON EXAMPLE
   * {
   *    "sensorname": "DHT11",
   *    "contractAddress": "0x18eF2C83F4CB2FFB546d630AEbA2a4C324d8fDb7",
   *    "measurements":[5, 6]
   * }
   *
   * @param {object} ctx
   * @param {Request} ctx.req
   * @param {Response} ctx.res
   */
  async getSensorMeasurement({ request, response }) {
    const contract = await web3bridge.getContractInstance(
      SMC_ADDRESS,
      SMC_BUILD_NAME,
      web3
    );
    const contract_service = new ContractService(web3, contract);
    const temperatures = await contract_service.getTemperatures();

    response.send(JSON.stringify(temperatures));
  }
}

module.exports = DataInsertionController;
