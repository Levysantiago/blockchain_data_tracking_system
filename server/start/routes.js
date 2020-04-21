"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

// SET MEASUREMENT
Route.post("/setMeasures", "DataInsertionController.setMeasurement").middleware(
  ["contract_provider", "fermentation_provider:last"]
);

// GET MEASUREMENT
Route.post(
  "/getMeasures",
  "DataVisualizationController.getMeasurement"
).middleware(["contract_provider", "fermentation_provider:id"]);

// GET TRANSACTIONS
Route.post(
  "/getTransactions",
  "DataVisualizationController.getTransactions"
).middleware(["contract_provider", "ethservice_provider"]);

// GET TRANSACTIONS BY FERMENTATION
Route.post(
  "/getTransactions/id",
  "DataVisualizationController.getTransactionsByFermentation"
).middleware([
  "contract_provider",
  "ethservice_provider",
  "fermentation_provider:id,specific"
]);

// GET LAST MEASUREMENT
Route.post(
  "/getLastMeasures",
  "DataVisualizationController.getLastMeasurement"
).middleware(["contract_provider", "fermentation_provider:last"]);

// ACTIVATE FERMENTATION
Route.get(
  "/fermentation/:activate",
  "DataInsertionController.activateFermentation"
);

// GET FERMENTATIONS
Route.get(
  "/fermentations",
  "DataVisualizationController.getFermentations"
).middleware(["fermentation_provider:list"]);

// GET LAST TRANSACTION
Route.get(
  "/getLatestTransaction",
  "DataVisualizationController.getLatestTransaction"
).middleware(["ethservice_provider"]);

// GET FERMENTATION
Route.get(
  "/fermentation",
  "DataVisualizationController.getFermentation"
).middleware(["fermentation_provider:last"]);
