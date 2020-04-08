require("dotenv").config();
const { SMC_ADDRESS, ETHSCAN_KEY, SMC_BUILD_NAME } = process.env;
const axios = require("axios");
const InputDataDecoder = require("ethereum-input-data-decoder");
const { interface: abi } = require("../ethereum/build/" + SMC_BUILD_NAME);
const decoder = new InputDataDecoder(JSON.parse(abi));

class EtherscanService {
  async getTransactions(startblock, endblock) {
    let transactions = await axios.get(
      "http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=" +
        SMC_ADDRESS +
        "&startblock=" +
        startblock +
        "&endblock=" +
        endblock +
        "&sort=desc&apikey=" +
        ETHSCAN_KEY
    );

    transactions = transactions.data.result;
    transactions.map(t => {
      let json = decoder.decodeData(t.input);
      t.input = json;
    });

    return transactions;
  }
}

module.exports = EtherscanService;
