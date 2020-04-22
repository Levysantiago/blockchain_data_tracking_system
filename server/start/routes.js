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

// GATEWAY
Route.post("/", "GatewayController.index").middleware(["gateway_provider"]);

// ACTIVATE FERMENTATION
Route.post("/fermentation", "DataInsertionController.activateFermentation");

// GET FERMENTATION
Route.get(
  "/fermentation",
  "DataVisualizationController.getFermentation"
).middleware(["fermentation_provider:last"]);

// GET FERMENTATIONS
Route.get(
  "/fermentations",
  "DataVisualizationController.getFermentations"
).middleware(["fermentation_provider:list"]);

// SET MEASUREMENT
Route.post("/measures", "DataInsertionController.setMeasurement").middleware([
  "contract_provider",
  "fermentation_provider:last"
]);

// GET MEASUREMENT
Route.get(
  "/measures/:fermentation_id",
  "DataVisualizationController.getMeasurement"
).middleware(["contract_provider", "fermentation_provider:id"]);

// GET LAST MEASUREMENT
Route.get(
  "/measures",
  "DataVisualizationController.getLastMeasurement"
).middleware(["contract_provider", "fermentation_provider:last"]);

// GET TRANSACTIONS
Route.get(
  "/transactions",
  "DataVisualizationController.getTransactions"
).middleware(["contract_provider", "ethservice_provider"]);

// GET TRANSACTIONS BY FERMENTATION
Route.get(
  "/transactions/:fermentation_id",
  "DataVisualizationController.getTransactionsByFermentation"
).middleware([
  "contract_provider",
  "ethservice_provider",
  "fermentation_provider:id,specific"
]);
