// SPDX-License-Identifier: MIT
pragma solidity 0.8.5;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract mockToken is ERC20{

    constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol){
            _mint(msg.sender,initialSupply);
    }

}