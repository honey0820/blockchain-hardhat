const hre = require("hardhat");
const BigNumber = require("bignumber.js");


async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  console.log('Deploying SBCToken, TokenStaking contract with address:', deployerAddress);

  // const SBCToken = await hre.ethers.getContractFactory("SBCToken");
  // const TokenStaking = await hre.ethers.getContractFactory("TokenStaking");

  // const sbcToken = await (await SBCToken.deploy()).deployed();
  // console.log('SBCToken contract deployed at', sbcToken.address);

  // const sbcPerBlock = new BigNumber(7).multipliedBy(10**16).toFixed(0);
  // const tokenStaking = await TokenStaking.deploy(sbcToken.address, 26400000, sbcPerBlock);
  // console.log('TokenStaking contract deployed at', tokenStaking.address);



  // const CroxToken = await hre.ethers.getContractFactory("CroxToken");
  // const CroxFee = await hre.ethers.getContractFactory("CroxFee");
  const BNBPrice = await hre.ethers.getContractFactory("PriceContract");

  const bnbprice = await (await BNBPrice.deploy()).deployed();
  console.log('bnbprice contract deployed at', bnbprice.address);

  // const croxToken = await (await CroxToken.deploy()).deployed();
  // console.log('Crox contract deployed at', croxToken.address);

  // const croxFee = await CroxFee.deploy("0x5d07b4f9cA73589d84E70A8191ed7fc948f169c0");
  // console.log('CroxFee contract deployed at', croxFee.address);

  // const masterChef = await MasterChef.deploy("0xf902B2Acb43b430a44e7f63915460150119cfd43");
  // console.log('MasterChef contract deployed at', masterChef.address);

  // 0x41Cf8c979A1C2BC63038B1C6bf2c37208Ce4E798 //masterchef

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
