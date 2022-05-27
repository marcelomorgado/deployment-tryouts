import hre from "hardhat";
// const fs = require("fs");
import fs from "fs";

const main = async () => {
  await hre.run("compile");
  await hre.run("deploy");

  console.log(`================= CHANGE IMPLEMENTATION AND DEPLOY AGAIN ===========================`);
  fs.copyFileSync("./MyContractV2.sol", "./contracts/MyContract.sol");

  await hre.run("deploy");
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
