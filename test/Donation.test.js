const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Test Donation contract", function () {
  
  let Donation;
  let donation;
  let owner;
  let testAccount;
  let provider;
  
  beforeEach(async function() {
    Donation = await ethers.getContractFactory('Donation');
    donation = await Donation.deploy();
    await donation.deployed();
    [owner, testAccount] = await ethers.getSigners();
    await owner.sendTransaction({
       to: donation.address,
       value: ethers.utils.parseEther("1.0"),
    });
    provider = ethers.provider;
  })
  
  
  it("Check or donator exists", async function () {
    expect(await donation.isDonatorExists(owner.address)).to.equal(true);
    expect(await donation.isDonatorExists(testAccount.address)).to.equal(false);
  })
  
  
  it('Check donate', async function(){
    expect(await provider.getBalance(donation.address)).to.equal(ethers.utils.parseEther("1"));
    expect(await donation.getDonators()).to.deep.equal([owner.address]);
    expect(await donation.getDonationByAddress(owner.address)).to.equal(ethers.utils.parseEther("1"));
    expect(await donation.getDonationByAddress(testAccount.address)).to.equal(0);
    await owner.sendTransaction({
       to: donation.address,
       value: ethers.utils.parseEther("3.5"),
    });
    await testAccount.sendTransaction({
       to: donation.address,
       value: ethers.utils.parseEther("0.5"),
    });
    expect(await provider.getBalance(donation.address)).to.equal(ethers.utils.parseEther("5"));
    expect(await donation.getDonators()).to.deep.equal([owner.address, testAccount.address]);
    expect(await donation.getDonationByAddress(owner.address)).to.equal(ethers.utils.parseEther("4.5"));
    expect(await donation.getDonationByAddress(testAccount.address)).to.equal(ethers.utils.parseEther("0.5"));
  })
  
  
  it('Not the owner is trying to withdraw funds', async function() {
    const donationAmount = ethers.utils.parseEther("0.4");
    await expect(donation.connect(testAccount).withdrawDonations(testAccount.address, donationAmount)).to.be.revertedWith('Ownable: caller is not the owner');
  })
  

  it('The owner is trying to withdraw funds', async function() {
    const donationAmountToWithdraw = ethers.utils.parseEther("0.7");
    const testAccountBalanceBeforeWithdraw = await testAccount.getBalance();
    const contractBalanceBeforeWithdraw = await provider.getBalance(donation.address);
    await donation.withdrawDonations(testAccount.address, donationAmountToWithdraw);
    
    const testAccountBalanceAfterFirstWithdraw = await testAccount.getBalance();
    const contractBalanceAfterFirstWithdraw = await provider.getBalance(donation.address);
    expect(testAccountBalanceBeforeWithdraw.add(donationAmountToWithdraw)).to.equal(testAccountBalanceAfterFirstWithdraw);
    expect(contractBalanceBeforeWithdraw.sub(donationAmountToWithdraw)).to.equal(contractBalanceAfterFirstWithdraw);
    
    await donation.withdrawDonations(testAccount.address, donationAmountToWithdraw);
    expect(testAccountBalanceAfterFirstWithdraw.add(contractBalanceAfterFirstWithdraw)).to.equal(await testAccount.getBalance());
    expect(await provider.getBalance(donation.address)).to.equal(0);
  })
  
});
