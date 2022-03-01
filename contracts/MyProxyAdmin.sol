// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";

contract MyProxyAdmin is ProxyAdmin {
    constructor(address _owner) {
        transferOwnership(_owner);
    }
}
