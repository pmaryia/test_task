require("dotenv").config();
const config = require("hardhat/config");
const { task } = config;


const donate = task("donate", "Donate")
  .addParam("contractAddress", "Donation contract address", process.env.DONATOR_CONTRACT_ADDRESS)
  .addParam("donationAmount", "Amount of ether to donate", "0.01")
  .setAction(async (taskArgs, hre) => {
    const [owner] = await hre.ethers.getSigners();
    await owner.sendTransaction({
      to: taskArgs.contractAddress,
      value: hre.ethers.utils.parseEther(taskArgs.donationAmount),
    });
  });


module.exports = donate;
