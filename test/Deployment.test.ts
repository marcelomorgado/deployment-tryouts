import { parseEther } from "@ethersproject/units";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { deployments, ethers } from "hardhat";
import { MyContract, MyContract__factory, MyProxyAdmin, MyProxyAdmin__factory } from "../typechain";

describe("Deployment", () => {
  let wallet: SignerWithAddress;
  let myContractA: Contract;
  let myContractB: Contract;
  let myProxyAdmin: MyProxyAdmin;

  beforeEach(async () => {
    [wallet] = await ethers.getSigners();
    const { MyContractA, MyContractB, MyProxyAdmin } = await deployments.fixture();
    myContractA = new ethers.Contract(MyContractA.address, ["function admin() view returns(address)"], wallet);
    myContractB = new ethers.Contract(MyContractB.address, ["function admin() view returns(address)"], wallet);
    myProxyAdmin = MyProxyAdmin__factory.connect(MyProxyAdmin.address, wallet);
  });

  it("should have the same impl", async () => {
    const aImpl = await myProxyAdmin.getProxyImplementation(myContractA.address);
    const bImpl = await myProxyAdmin.getProxyImplementation(myContractB.address);

    expect(aImpl).eq(bImpl);
  });

  it("should have the same proxy admin", async () => {
    const aAdm = await myProxyAdmin.getProxyAdmin(myContractA.address);
    const bAdm = await myProxyAdmin.getProxyAdmin(myContractB.address);

    expect(aAdm).eq(bAdm);
  });
});
