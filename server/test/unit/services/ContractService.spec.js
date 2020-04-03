"use strict";

const { test, before } = use("Test/Suite")("Testing Contract Service");

const helpers = require("../../helpers");
const ContractService = use("App/services/ContractService");

let contract,
  accounts,
  owner,
  contract_address,
  contract_name,
  contract_service;
before(async () => {
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
  await contract_service.setTemperature(5, owner, 1000000);
  const temperatures = await contract_service.getTemperatures();

  assert.equal(temperatures[0], "5");
});
