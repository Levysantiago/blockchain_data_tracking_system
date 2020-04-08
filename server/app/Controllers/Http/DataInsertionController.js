"use strict";

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
    const contract = await web3bridge.getContractInstance(
      SMC_ADDRESS,
      SMC_BUILD_NAME,
      web3
    );
    const { measurements } = request.post();

    const contract_service = new ContractService(web3, contract);
    await contract_service.setTemperatureAndHumidity(
      measurements,
      BC_ADDRESS,
      GAS
    );

    response.send(200);
  }
}

module.exports = DataInsertionController;
