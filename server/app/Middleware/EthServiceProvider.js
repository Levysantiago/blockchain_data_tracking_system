"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const EtherscanService = use("App/services/EtherscanService");

class EthServiceProvider {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request }, next) {
    const ethservice = new EtherscanService();

    request.ethservice = ethservice;

    // call next to advance the request
    await next();
  }
}

module.exports = EthServiceProvider;
