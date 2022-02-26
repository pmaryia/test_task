require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");
require("./tasks/withdraw-donations");
require("./tasks/get-donators");
require("./tasks/get-donation-by-address");
require("./tasks/donate");


module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.0"
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
};
