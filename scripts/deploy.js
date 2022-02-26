const { ethers } = require("hardhat");


async function main() {
  const Donation = await ethers.getContractFactory("Donation");
  const donation = await Donation.deploy();
  console.log("Donation contract address:", donation.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
