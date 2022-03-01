// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract MyContract is Initializable {
    string public name;

    function initialize(string calldata _name) public initializer {
        name = _name;
    }
}
