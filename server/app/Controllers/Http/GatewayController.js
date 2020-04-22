"use strict";

const api = use("App/lib/api");

class GatewayController {
  async index({ request, response }) {
    const { route, method, headers, body } = request.post();

    const result = await api(route, {
      method: method,
      headers: headers,
      data: body
    });

    const json = {
      data: await result.data
    };

    response.send(json);
  }
}

module.exports = GatewayController;
