require("dotenv").config();

const env = process.env;
const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const contract = require("./build/" + env.SMC_BUILD_NAME);
const provider = new HDWalletProvider(env.MNEMONIC_WORDS, env.PROVIDER_LINK);

const web3 = new Web3(provider);
const deploy = async () => {
  // Create a new contract and define ABI access
  const result = await new web3.eth.Contract(JSON.parse(contract.interface))
    // Deploy configuration
    .deploy({
      data: contract.bytecode,
      arguments: [env.BC_ADDRESS]
    })
    .send({
      gas: env.GAS,
      from: env.BC_ADDRESS
    });
  console.log(result.options.address);
};
deploy();
