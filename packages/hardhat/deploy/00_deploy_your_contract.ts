import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * Deploys the RWAOracle contract using the deployer account.
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
// const deployRWAOracle: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
//   const { deployer } = await hre.getNamedAccounts();
//   const { deploy } = hre.deployments;

//   // Deploy RWAOracle
//   const rwaOracle = await deploy("RWAOracle", {
//     from: deployer,
//     args: [], // Add any required constructor arguments here
//     log: true,
//     autoMine: true,
//   });

//   console.log("✅ RWAOracle deployed at:", rwaOracle.address);
// };

// export default deployRWAOracle;

// // Tags are useful if you have multiple deploy files and only want to run one of them.
// // e.g., yarn deploy --tags RWAOracle
// deployRWAOracle.tags = ["RWAOracle"];

// const deployMockRWAToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
//   const { deployer } = await hre.getNamedAccounts();
//   const { deploy } = hre.deployments;

//   // Deploy MockRWAToken
//   const MockRWAToken = await deploy("MockRWAToken", {
//     from: deployer,
//     args: ["MockRWA", "MRWA"], // Add constructor arguments if needed
//     log: true,
//     autoMine: true,
//   });

//   console.log("✅ MockRWAToken deployed at:", MockRWAToken.address);
// };

// export default deployMockRWAToken;

// deployMockRWAToken.tags = ["MockRWAToken"];


/**
 * Deploys the LendingPool contract using the deployer account.
 * 
 * @param hre HardhatRuntimeEnvironment object.
 */
  const deployLendingPool: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, get } = hre.deployments;

  // Fetch the deployed RWAOracle contract
  // const rwaOracleDeployment = await get("RWAOracle");
  const rwaOracleAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  // Deploy LendingPool with the RWAOracle address
  const lendingPoolDeployment = await deploy("LendingPool", {
    from: deployer,
    args: [rwaOracleAddress], // Constructor argument: RWAOracle address
    log: true,
    autoMine: true,
  });

  console.log("✅ LendingPool deployed at:", lendingPoolDeployment.address);

  // // Optional: Get and log the LendingPool contract's initial state
  // const lendingPoolContract = await hre.ethers.getContract<Contract>("LendingPool", deployer);
  // console.log("📦 LendingPool admin address:", await lendingPoolContract.admin());
};

export default deployLendingPool;

// Tag for selective deployment
deployLendingPool.tags = ["LendingPool"];

