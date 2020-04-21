"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

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
const helpers = use("App/lib/helpers");

class ContractProvider {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response }, next) {
    const contract = await web3bridge.getContractInstance(
      SMC_ADDRESS,
      SMC_BUILD_NAME,
      web3
    );

    if (helpers.isObjEmpty(contract)) {
      return response.send(500);
    }

    const contract_service = new ContractService(web3, contract);

    request.contract_service = contract_service;
    request.web3 = web3;

    // call next to advance the request
    await next();
  }
}

module.exports = ContractProvider;
