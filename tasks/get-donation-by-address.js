require("dotenv").config();
const config = require("hardhat/config");
const { task } = config;


const getDonationByAddress = task("get-donation-by-address", "Get donation amount by address")
  .addParam("contractAddress", "Donation contract address", process.env.DONATOR_CONTRACT_ADDRESS)
  .addParam("donatorAddress", "Donator's address", "0x9FA28ce30C3200F0078f101058628b724B9a8C39")
  .setAction(async (taskArgs, hre) => {
    const DonationContract = await hre.ethers.getContractFactory("Donation");
    const donationContract = await DonationContract.attach(taskArgs.contractAddress);
    const donationAmount = await donationContract.getDonationByAddress(taskArgs.donatorAddress);
    console.log('Donation amount by address: ', donationAmount);
  });


module.exports = getDonationByAddress;
