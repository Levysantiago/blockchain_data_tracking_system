"use strict";

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
    const contract_service = request.contract_service;
    const fermentation_id = request.fermentation_id;

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
  async getLastMeasurement({ request, response }) {
    // Obtaining the contract service from middleware
    const contract_service = request.contract_service;

    // Obtaining the last fermentation
    let fermentation = request.fermentation;

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

    const ethservice = request.ethservice;
    const transactions = await ethservice.getTransactions(
      request.web3,
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
    const fermentation = request.fermentation;

    let { blockstart, blockend } = fermentation;

    if (!blockstart && !blockend) {
      response.send([]);
    } else {
      const ethservice = request.ethservice;
      const transactions = await ethservice.getTransactions(
        request.web3,
        blockstart,
        blockend
      );

      response.send(JSON.stringify(transactions));
    }
  }

  async getFermentations({ request, response }) {
    const fermentations = request.fermentations;

    response.send(fermentations);
  }

  async getFermentation({ request, response }) {
    const fermentation = request.fermentation;

    return response.send(JSON.stringify(fermentation));
  }
}

module.exports = DataVisualizationController;
