
import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'


require('dotenv').config()// .env dosyasımı oluşturucaz*
const mnemonic = process.env.MNEMONIC;
const RINKEBY_KEY = process.env.RINKEBY_KEY;
const MAINNET_KEY = process.env.MAINNET_KEY;


module.exports = {
  solidity: "0.8.5",
  networks: {
    rinkeby: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${RINKEBY_KEY}`,
      accounts: [`${mnemonic}`]
    }
  }
};
