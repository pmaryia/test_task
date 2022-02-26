require("dotenv").config();
const config = require("hardhat/config");
const { task, types } = config;


const withdrawDonations = task("withdraw-donations", "Withdraw a certain amount of donations to a certain address")
  .addParam("contractAddress", "Donation contract address", process.env.DONATOR_CONTRACT_ADDRESS)
  .addParam("to", "Address to which donations will be transferred", "0x9FA28ce30C3200F0078f101058628b724B9a8C39")
  .addParam("amount", "The amount of donations to be transferred (ether)", '0.01', types.string)
  .setAction(async (taskArgs, hre) => {
    const DonationContract = await hre.ethers.getContractFactory("Donation");
    const donationContract = await DonationContract.attach(taskArgs.contractAddress);
    await donationContract.withdrawDonations(taskArgs.to, hre.ethers.utils.parseEther(taskArgs.amount));
  });


module.exports = withdrawDonations;
