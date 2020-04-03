module.exports = {
  getContractInstance: async (contractAddress, contractName, web3) => {
    const { interface: abi } = require("../ethereum/build/" + contractName);
    return await new web3.eth.Contract(JSON.parse(abi), contractAddress);
  }
};
