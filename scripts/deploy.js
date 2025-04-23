const hre = require("hardhat");

async function main() {
  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();  // This deploys the contract

  await voting.waitForDeployment();  // ✅ Use this instead of .deployed()

  console.log(`Voting contract deployed at: ${voting.target}`);  // Use .target instead of .address
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
