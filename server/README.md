This project uses [Adonis](https://adonisjs.com/) as framework.

# Server side

This is the server side of this project, an API that communicates with the Smart Contracts.

# Endpoints

| Endpoint         | Method | Description                                                 | Arguments                     |
| ---------------- | ------ | ----------------------------------------------------------- | ----------------------------- |
| /setMeasures     | POST   | Set the measures sent by a sensor.                          | ids, sensorname, measurements |
| /getMeasures     | POST   | Get from the smart contract the measures of a given sensor. | ids, sensorname               |
| /getLastMeasures | POST   | Get the last measure of a sensor.                           | ids, sensorname               |
| /getTransactions | POST   | Get all transactions from the smart contract of a sensor.   | ids, sensorname               |

## Arguments definition

| Name         | Description                                      | Type   |
| ------------ | ------------------------------------------------ | ------ |
| ids          | The id of the sensor in the middleware (server)  | String |
| sensorname   | The name of the sensor (e.g.: "DHT11")           | String |
| measurements | The measure(s) of the sensor (e.g.: Temperature) | Array  |
