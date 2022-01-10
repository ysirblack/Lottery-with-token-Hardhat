
const toBN = ethers.utils.parseEther;

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const Token = await ethers.getContractFactory("mockToken");
    const mockToken = await Token.deploy("Coinn","CN",toBN("100000000000000000000"));
  
    console.log("Token deployed to : address:", mockToken.address);
  }
  

  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });