require("dotenv").config();
const { SMC_ADDRESS, ETHSCAN_KEY, SMC_BUILD_NAME } = process.env;
const axios = require("axios");
const InputDataDecoder = require("ethereum-input-data-decoder");
let { interface: abi } = require("../ethereum/build/" + SMC_BUILD_NAME);
abi = JSON.parse(abi);
const decoder = new InputDataDecoder(abi);
const { parseLog } = require("ethereum-event-logs");

class EtherscanService {
  async getTransactions(web3, startblock, endblock) {
    let transactions = await axios.get(
      "http://api-rinkeby.etherscan.io/api?module=account&&action=txlist&address=" +
        SMC_ADDRESS +
        "&startblock=" +
        startblock +
        "&endblock=" +
        endblock +
        "&sort=desc&apikey=" +
        ETHSCAN_KEY
    );

    transactions = transactions.data.result;
    await Promise.all(
      transactions.map(async t => {
        // Decoding the input data
        let json = decoder.decodeData(t.input);
        json.inputs[0] = json.inputs[0].toString();
        t.input = json;

        // Setting up the events
        let events = await web3.eth.getTransactionReceipt(t.hash);

        let logs = events["logs"];

        // If there are logs
        if (logs.length) {
          logs = parseLog(logs, abi);
          // Removing unneeded information
          logs = [{ name: logs[0].name, args: logs[0].args }];
        }

        t.logs = logs;

        return t;
      })
    );

    return transactions;
  }

  async getLatestTransaction() {
    let transaction = await axios.get(
      "http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=" +
        SMC_ADDRESS +
        "&startblock=0&endblock=99999999&sort=desc&apikey=" +
        ETHSCAN_KEY
    );
    transaction = transaction.data.result[0];

    let json = decoder.decodeData(transaction.input);
    //Considering data as INT
    transaction.input.inputs[0] = transaction.input.inputs[0].toString();
    transaction.input = json;

    return transaction;
  }

  async getLastTwoTransactions() {
    let trx = await axios.get(
      "http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=" +
        SMC_ADDRESS +
        "&startblock=0&endblock=99999999&sort=desc&apikey=" +
        ETHSCAN_KEY
    );
    let trx2 = trx.data.result[1];
    trx = trx.data.result[0];

    trx.input = decoder.decodeData(trx.input);
    trx2.input = decoder.decodeData(trx2.input);
    //Considering data as INT
    trx.input.inputs[0] = trx.input.inputs[0].toString();
    trx2.input.inputs[0] = trx2.input.inputs[0].toString();
    let json = [trx, trx2];

    return json;
  }
}

module.exports = EtherscanService;
