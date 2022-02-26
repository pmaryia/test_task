require("dotenv").config();
const config = require("hardhat/config");
const { task } = config;


const getDonators = task("get-donators", "Get list of donators")
  .addParam("contractAddress", "Donation contract address", process.env.DONATOR_CONTRACT_ADDRESS)
  .setAction(async (taskArgs, hre) => {
    const DonationContract = await hre.ethers.getContractFactory("Donation");
    const donationContract = await DonationContract.attach(taskArgs.contractAddress);
    const donators = await donationContract.getDonators();
    console.log('Donators: ', donators)
});


module.exports = getDonators;
