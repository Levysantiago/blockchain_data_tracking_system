"use strict";

const { test, beforeEach } = use("Test/Suite")("Testing Contract Service");

const helpers = require("../../helpers");
const ContractService = use("App/services/ContractService");

let contract,
  accounts,
  owner,
  contract_address,
  contract_name,
  contract_service,
  gas = 1000000;
beforeEach(async () => {
  contract_name = "DHT11.json";
  accounts = await helpers.accounts();
  owner = accounts[0];
  contract = await helpers.deploy(owner, "1000000");
  contract_address = contract.options.address;
  contract_service = new ContractService(helpers.web3, contract);
});

test("Testing variables consistency", async ({ assert }) => {
  assert.ok(contract);
  assert.equal(contract.options.address, contract_address);
});

test("Function:setTemperature", async ({ assert }) => {
  const measure = 5;
  const fermentation_id = 0;
  await contract_service.setTemperature(measure, fermentation_id, owner, gas);
  const temperatures = await contract_service.getTemperatures(fermentation_id);

  assert.equal(temperatures[0], "5");
});

test("Function:setTemperature", async ({ assert }) => {
  const measures_amount = 5;
  const fermentation_id = 0;

  let expected_list = [];
  for (let i = 0; i < measures_amount; i++) {
    let measure = 10 + i;

    // Filling the expected list
    expected_list.push(measure + "");

    // Setting the first measure
    await contract_service.setTemperature(measure, fermentation_id, owner, gas);
  }

  // Obtaining the temperatures
  const temperatures = await contract_service.getTemperatures(fermentation_id);

  let i = 0;
  temperatures.map(measure => {
    assert.equal(measure, expected_list[i], "Error at iteraction: " + i++);
  });
});
