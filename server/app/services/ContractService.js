const Web3 = use("web3");

class ContractService {
  constructor(web3, contractInstance) {
    this.web3 = web3;
    this.contract = contractInstance;
  }

  async setTemperature(temperature, from, gas) {
    await this.contract.methods
      .setTemperature(temperature)
      .send({ from: from, gas: gas });
  }

  async getTemperatures() {
    const temperatures = await this.contract.methods.getTemperatures().call();
    return temperatures;
  }
}

module.exports = ContractService;
