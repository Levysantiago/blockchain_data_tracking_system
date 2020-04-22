"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class GatewayProvider {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request }, next) {
    const json = request.post();
    const method_dict = {
      w: "post",
      r: "get"
    };

    // Setting the request values
    request.post().method = method_dict[json.type.toLowerCase()];

    // call next to advance the request
    await next();
  }
}

module.exports = GatewayProvider;
