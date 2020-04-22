This project uses [Adonis](https://adonisjs.com/) as framework.

# Server side

This is the server side of this project, an API that communicates with the Smart Contracts.

# Endpoints

| Endpoint                      | Method    | Description                                                                                                 | Arguments                                             |
| ----------------------------- | --------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| /                             | POST      | This is the Gateway route. By this route is possible to reach all the other routes, acting as a Middleware. | idm, idapp, type, route, (body or headers), timestamp |
| /fermentation                 | POST      | Start or sop a new fermentation process.                                                                    | activate                                              |
| /fermentation                 | HEAD, GET | Get the actual fermentation process, the one that is running.                                               |                                                       |
| /fermentations                | HEAD, GET | Get all fermentation processes registered.                                                                  |                                                       |
| /measures                     | POST      | Set the measures sent by a sensor.                                                                          | ids, sensorname, measurements                         |
| /measures:fermentation_id     | HEAD, GET | Get from the smart contract the all measures of a sensor from a specific fermentation process.              | ids, sensorname                                       |
| /measures                     | HEAD, GET | Get from the smart contract the last measure(s) of a sensor from a specific fermentation process.           | ids, sensorname, fermentation_id                      |
| /transactions                 | HEAD, GET | Get all transactions from the smart contract of a sensor.                                                   | ids, sensorname                                       |
| /transactions:fermentation_id | HEAD, GET | Get all transactions from the smart contract of a sensor of a specific fermentation process.                | ids, sensorname                                       |

## Arguments definition

| Name            | Description                                                           | Type    | Values        |
| --------------- | --------------------------------------------------------------------- | ------- | ------------- |
| idm             | The id of the middleware.                                             | String  |               |
| idapp           | The id of dapp registered in the middleware.                          | String  |               |
| type            | The type of the request (read or write).                              | String  | 'W' or 'R'    |
| route           | The route to be called by the gateway.                                | String  |               |
| body            | The body of the request sent to the gateway.                          | Object  |               |
| headers         | The headers of the request sent to the gateway.                       | Object  |               |
| timestamp       | The timestamp of when the request was sent to the gateway.            | Integer |               |
| activate        | The value to activate or desactivate the actual fermentation process. | Bool    | true or false |
| ids             | The id of the sensor registered in the server                         | String  |               |
| sensorname      | The name of the sensor (e.g.: "DHT11")                                | String  |               |
| measurements    | The measure(s) of the sensor (e.g.: Temperature)                      | Array   |               |
| fermentation_id | The id of a fermentation process                                      | Integer |               |
