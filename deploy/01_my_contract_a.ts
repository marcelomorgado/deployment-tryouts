import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const name = "MyContractA";
const contract = "MyContract";
const proxyAdmin = "MyProxyAdmin";

const func: DeployFunction = async ({ getNamedAccounts, deployments }: HardhatRuntimeEnvironment) => {
  const { deterministic, getOrNull, execute } = deployments;
  const { deployer } = await getNamedAccounts();

  const alreadyDeployed = await getOrNull(proxyAdmin);

  const viaAdminContract = !alreadyDeployed
    ? proxyAdmin
    : {
        name: proxyAdmin,
      };

  const { address, implementationAddress, deploy } = await deterministic(name, {
    contract,
    from: deployer,
    log: true,
    proxy: {
      proxyContract: "OpenZeppelinTransparentProxy",
      viaAdminContract,
      implementationName: `${contract}_Implementation`,
    },
    salt: "0x01",
  });

  await deploy();

  await execute(name, { from: deployer, log: true }, "initialize", name);
};

export default func;
func.tags = [name];
