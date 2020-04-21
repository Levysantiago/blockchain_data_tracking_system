class ContractService {
  constructor(web3, contractInstance) {
    this.web3 = web3;
    this.contract = contractInstance;
  }

  async setTemperature(temperature, fermentation_id, from, gas) {
    await this.contract.methods
      .setTemperature(temperature, fermentation_id)
      .send({ from: from, gas: gas });
  }

  async setHumidity(humidity, fermentation_id, from, gas) {
    await this.contract.methods
      .setHumidity(humidity, fermentation_id)
      .send({ from: from, gas: gas });
  }

  async setTemperatureAndHumidity(measures, fermentation_id, from, gas) {
    if (measures.length > 1) {
      let results = {};
      results.temperature = await this.contract.methods
        .setTemperature(measures[0], fermentation_id)
        .send({ from: from, gas: gas });
      results.humidity = await this.contract.methods
        .setHumidity(measures[1], fermentation_id)
        .send({ from: from, gas: gas });

      return results;
    }
    return false;
  }

  async getTemperatures(fermentation_id) {
    const temperatures = await this.contract.methods
      .getTemperatures(fermentation_id)
      .call();
    return temperatures;
  }

  async getHumidities(fermentation_id) {
    const humidities = await this.contract.methods
      .getHumidities(fermentation_id)
      .call();
    return humidities;
  }

  async getLastMeasures(fermentation_id) {
    const last_measures = await this.contract.methods
      .getLastValues(fermentation_id)
      .call();
    return last_measures;
  }
}

module.exports = ContractService;
