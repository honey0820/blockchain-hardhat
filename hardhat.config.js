require('dotenv').config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-gas-reporter');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const PRIVATE_KEY = process.env.PRIVATE_KEY;
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.16",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://explorer.matic.network/
    apiKey: process.env.BSCSCAN_API_KEY
  },

  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },

  mocha: {
    timeout: 20000
  },

  gasReporter: {
    currency: 'USD',
    enabled: false,
    gasPrice: 50,
  },

  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/e92c433ba7214537873fe0025ee0763c`,
      chainId: 4,
      accounts: [`0x${PRIVATE_KEY}`]
    },

    bscmainnet: {
      url: `https://bsc-dataseed.binance.org/`,
      chainId: 56,
      accounts: [`0x${PRIVATE_KEY}`]
    },

    bsctestnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
      chainId: 97,
      
      accounts: [`0x${PRIVATE_KEY}`]
    },

    maticmainnet: {
      url: `https://rpc-mainnet.maticvigil.com/`,
      chainId: 137,
      
      accounts: [`0x${PRIVATE_KEY}`]
    },

    mumbaitestnet: {
      url: `https://matic-mumbai.chainstacklabs.com`,
      chainId: 80001,
      
      accounts: [`0x${PRIVATE_KEY}`]
    },

    localhost: {
      url: `http://127.0.0.1:8545`
    },
  },
};
