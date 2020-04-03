const Web3 = use("web3");
const ganache = require("ganache-cli");
const web3 = new Web3(ganache.provider());
const { interface: abi, bytecode } = use("App/ethereum/build/DHT11.json");

module.exports = {
  web3: web3,
  accounts: async () => {
    return await web3.eth.getAccounts();
  },
  deploy: async (from, gas) => {
    let contract = await new web3.eth.Contract(JSON.parse(abi))
      .deploy({ data: bytecode, arguments: [from] })
      .send({ from: from, gas: gas });

    return contract;
  }
};
