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

  async setHumidity(humidity, from, gas) {
    await this.contract.methods
      .setHumidity(temperature)
      .send({ from: from, gas: gas });
  }

  async setTemperatureAndHumidity(measures, from, gas) {
    if (measures.length > 1) {
      await this.contract.methods
        .setTemperature(measures[0])
        .send({ from: from, gas: gas });
      await this.contract.methods
        .setHumidity(measures[1])
        .send({ from: from, gas: gas });
    }
  }

  async getTemperatures() {
    const temperatures = await this.contract.methods.getTemperatures().call();
    return temperatures;
  }

  async getHumidities() {
    const humidities = await this.contract.methods.getHumidities().call();
    return humidities;
  }

  async getLastMeasures() {
    const last_measures = await this.contract.methods.getLastValues().call();
    return last_measures;
  }
}

module.exports = ContractService;
