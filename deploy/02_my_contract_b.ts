import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const name = "MyContractB";
const contract = "MyContract";
const proxyAdmin = "MyProxyAdmin";

const func: DeployFunction = async ({ getNamedAccounts, deployments }: HardhatRuntimeEnvironment) => {
  const { deploy, getOrNull, execute } = deployments;
  const { deployer } = await getNamedAccounts();

  const { address, implementation: implementationAddress } = await deploy(name, {
    from: deployer,
    log: true,
    proxy: {
      proxyContract: "OpenZeppelinTransparentProxy",
      viaAdminContract: proxyAdmin,
      implementationName: contract,
      execute: {
        init: {
          methodName: "initialize",
          args: [name],
        },
      },
    },
  });
};

export default func;
func.tags = [name];
