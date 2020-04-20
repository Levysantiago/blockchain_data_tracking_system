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

Route.post("/setMeasures", "DataInsertionController.setMeasurement");
Route.post("/getMeasures", "DataVisualizationController.getMeasurement");
Route.post("/getTransactions", "DataVisualizationController.getTransactions");
Route.post(
  "/getLastMeasures",
  "DataVisualizationController.getLastMeasurement"
);
Route.get(
  "/fermentation/:activate",
  "DataInsertionController.activateFermentation"
);
Route.get("/fermentations", "DataVisualizationController.getFermentations");
Route.get(
  "/getLatestTransaction",
  "DataVisualizationController.getLatestTransaction"
);
Route.get("/fermentation", "DataVisualizationController.getFermentation");
