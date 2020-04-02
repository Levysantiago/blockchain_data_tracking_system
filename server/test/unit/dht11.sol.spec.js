"use strict";

const { test, before } = use("Test/Suite")("Testing DHT11 Smart Contract");

const Web3 = use("web3");
//If using external provider
//const provider = new Web3.providers.HttpProvider(env.PROVIDER_LINK);
//const web3 = new Web3(provider);
const ganache = require("ganache-cli");
const web3 = new Web3(ganache.provider());
const {
  interface: abi,
  bytecode
} = require("../../app/ethereum/build/DHT11.json");

let contract, accounts, owner, contract_address;
before(async () => {
  accounts = await web3.eth.getAccounts();
  owner = accounts[0];
  contract = await new web3.eth.Contract(JSON.parse(abi))
    .deploy({ data: bytecode, arguments: [owner] })
    .send({ from: owner, gas: "1000000" });
  contract_address = contract.options.address;
});

test("Contract address", async ({ assert }) => {
  assert.equal(contract.options.address, contract_address);
});
