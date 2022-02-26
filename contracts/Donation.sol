//SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Donation is Ownable {

    struct DonationStruct {
        uint256 amount;
        uint256 donatorIndex;
    }

    mapping(address => DonationStruct) private donations;

    address[] private donators;

    function isDonatorExists(address _donator) public view returns(bool) {
        if(donators.length == 0) return false;
        return (donators[donations[_donator].donatorIndex] == _donator);
    }

    function donate() public payable {
        address sender = msg.sender;
        donations[sender].amount += msg.value;
        if (!isDonatorExists(sender)) {
            donators.push(sender);
            donations[sender].donatorIndex = donators.length - 1;
        }
    }

    receive() external payable {
        donate();
    }

    function getDonators() public view returns(address[] memory) {
        return donators;
    }

    function getDonationByAddress(address _address) public view returns(uint256){
        return donations[_address].amount;
    }

    function withdrawDonations(address payable _to, uint256 _amount) external onlyOwner {
        uint256 ethBalance = address(this).balance;
        if (_amount > ethBalance) {
            _to.transfer(ethBalance);
        } else {
            _to.transfer(_amount);
        }
    }

}
