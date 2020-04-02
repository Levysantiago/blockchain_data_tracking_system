const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname, "contracts", "dht11.sol");
const source = fs.readFileSync(contractPath, "UTF-8");
const output = solc.compile(source, 1).contracts;
fs.ensureDirSync(buildPath);

for (let contrato in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contrato.replace(":", "") + ".json"),
    output[contrato]
  );
}
