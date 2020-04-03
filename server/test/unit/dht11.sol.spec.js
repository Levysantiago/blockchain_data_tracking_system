"use strict";

const { test, before } = use("Test/Suite")("Testing DHT11 Smart Contract");

const helpers = require("../helpers");

let contract, accounts, owner, contract_address;
before(async () => {
  accounts = await helpers.accounts();
  owner = accounts[0];
  contract = await helpers.deploy(owner, "1000000");
  contract_address = contract.options.address;
});

test("Contract address", async ({ assert }) => {
  assert.equal(contract.options.address, contract_address);
});
