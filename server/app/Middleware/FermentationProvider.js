"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const db = use("App/services/DatabaseService");
const helpers = use("App/lib/helpers");

class FermentationProvider {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response }, next, properties) {
    // Validating and saving fermentation_id to request
    if (properties.includes("id")) {
      const rules = {
        fermentation_id: "required|integer"
      };

      const valid = await helpers.validate(request.all(), rules);
      if (!valid) {
        return response.send(400);
      }

      const { fermentation_id } = request.all();

      const is_id_valid = await db.isValidId(fermentation_id);
      if (!is_id_valid) {
        return response.send(400);
      }

      request.fermentation_id = fermentation_id;
    }

    // Selecting a specific fermentation by the id
    if (properties.includes("specific")) {
      const fermentation = await db.getFermentation(request.fermentation_id);

      if (!fermentation) {
        return response.status(404).send("No fermentation found");
      }

      request.fermentation = fermentation;
    }

    // Selecting the last fermentation
    if (properties.includes("last")) {
      const fermentation = await db.getLastFermentation();

      if (!fermentation) {
        return response.status(404).send("No fermentation found");
      }

      request.fermentation = fermentation;
    }

    // Selecting a list of fermentations
    if (properties.includes("list")) {
      const fermentations = await db.selectFermentations();

      let i = 0;
      fermentations.map(f => {
        if (!f.timestamp) {
          f.blockstart = f.blockend = f.timestamp = "...";
        }
        f.list_id = i++;
      });

      request.fermentations = fermentations;
    }

    // call next to advance the request
    await next();
  }
}

module.exports = FermentationProvider;
