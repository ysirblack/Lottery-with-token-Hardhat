import { ethers } from "hardhat";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  LotteryV4,
  LotteryV4__factory,
  MockToken,
  MockToken__factory,
} from "../typechain-types/";
describe("lotteryDeployed Test", () => {
  let [
    owner,
    fringe,
    scheback,
    sawakaga,
    skygge,
    woodcutter,
    ysirblack,
    mercy,
  ]: SignerWithAddress[] = [];

  let ERC20Factory: MockToken__factory;
  let erc20: MockToken;
  let LotteryFactory: LotteryV4__factory;
  let lotteryDeployed: LotteryV4;

  it("Deploy lotteryDeployed", async () => {
    
    [owner, fringe, scheback, sawakaga, skygge, woodcutter, ysirblack, mercy] =
      (await ethers.getSigners()) as SignerWithAddress[];

      LotteryFactory = (await ethers.getContractFactory(
      "LotteryV4"
    )) as LotteryV4__factory;
    lotteryDeployed = (await LotteryFactory.deploy()) as LotteryV4;
    await lotteryDeployed.deployed();

    const deployEden = await lotteryDeployed.callStatic.owner(); //await eklemeyi unutma!//callStatic'te call methodu gibi web3 de blockchainde state değiştirmeyen çağrılarda kullanılıyor
    // const deployEden = await lotteryDeployed.connect(owner).callStatic.owner();//böylede çalıştı
    // const deployEden = await lotteryDeployed.owner();// böyle de çalıştı;
    expect(deployEden).to.be.eq(owner.address);
  });

  it("Deploy Token and mint", async () => {
  
    ERC20Factory = (await ethers.getContractFactory(
      "mockToken"
    )) as MockToken__factory;
    erc20 = (await ERC20Factory.deploy("denem", "dnm", (1000000).toString())) as MockToken;
    await erc20.deployed();

    const balanceOfOwner = await erc20.connect(owner).balanceOf(owner.address);
    expect((1000000).toString()).to.be.eq(balanceOfOwner);
  });

  it("Send token to all people and Set token address", async () => {

    const sharedMoney = (125000).toString();
    await erc20.connect(owner).transfer(fringe.address, sharedMoney);
    await erc20.connect(owner).transfer(scheback.address, sharedMoney);
    await erc20.connect(owner).transfer(sawakaga.address, sharedMoney);
    await erc20.connect(owner).transfer(skygge.address, sharedMoney);
    await erc20.connect(owner).transfer(woodcutter.address, sharedMoney);
    await erc20.connect(owner).transfer(ysirblack.address, sharedMoney);
    await erc20.connect(owner).transfer(mercy.address, sharedMoney);

    await lotteryDeployed.connect(owner).addTokenAddress(erc20.address);

    const balanceOfOwner = await erc20
      .connect(owner)
      .callStatic.balanceOf(owner.address);
    expect(balanceOfOwner).to.be.eq(sharedMoney);
    await erc20.connect(mercy).transfer(owner.address, sharedMoney);
  });

  it("Approve and Registery before Starting => Should Revert ", async () => {
   
    const approvedAmount = 500;
    await erc20.connect(owner).approve(lotteryDeployed.address, approvedAmount);
    await erc20.connect(fringe).approve(lotteryDeployed.address, approvedAmount);
    await erc20.connect(scheback).approve(lotteryDeployed.address, approvedAmount);
    await erc20.connect(sawakaga).approve(lotteryDeployed.address, approvedAmount);
    await erc20.connect(skygge).approve(lotteryDeployed.address, approvedAmount);
    await erc20.connect(woodcutter).approve(lotteryDeployed.address, approvedAmount);
    await erc20.connect(ysirblack).approve(lotteryDeployed.address, approvedAmount);
    //await erc20.connect(mercy).approve(lotteryDeployed.address, 500);

    await expect(lotteryDeployed.connect(owner).register()).to.be.revertedWith("Hasn't started yet!");
    await expect(lotteryDeployed.connect(fringe).register()).to.be.revertedWith("Hasn't started yet!");
    await expect(lotteryDeployed.connect(scheback).register()).to.be.revertedWith("Hasn't started yet!");
    await expect(lotteryDeployed.connect(sawakaga).register()).to.be.revertedWith("Hasn't started yet!");
    await expect(lotteryDeployed.connect(skygge).register()).to.be.revertedWith("Hasn't started yet!");
    await expect(lotteryDeployed.connect(woodcutter).register()).to.be.revertedWith("Hasn't started yet!");
    await expect(lotteryDeployed.connect(ysirblack).register()).to.be.revertedWith("Hasn't started yet!");


  });

  it("Set the Fee and Let Them Register Theirselves ", async () => {

    await lotteryDeployed.connect(owner).setFee(500);

    await lotteryDeployed.connect(owner).register();
    await lotteryDeployed.connect(fringe).register();
    await lotteryDeployed.connect(scheback).register();
    await lotteryDeployed.connect(sawakaga).register();
    await lotteryDeployed.connect(skygge).register();
    await lotteryDeployed.connect(woodcutter).register();
    await lotteryDeployed.connect(ysirblack).register();
    await expect(lotteryDeployed.connect(mercy).register()).to.be.revertedWith("ERC20: transfer amount exceeds balance");

    console.log(await erc20.balanceOf(owner.address));
    console.log(await erc20.balanceOf(fringe.address));
    console.log(await erc20.balanceOf(scheback.address));
    console.log(await erc20.balanceOf(sawakaga.address));
    console.log(await erc20.balanceOf(skygge.address));
    console.log(await erc20.balanceOf(woodcutter.address));
    console.log(await erc20.balanceOf(ysirblack.address));
    console.log(await erc20.balanceOf(mercy.address));


    const numberOfPeople = await lotteryDeployed.lottery();
    const moneyCollected = await lotteryDeployed.lottery();
   
 
    expect(numberOfPeople[1]).to.be.eq(7);
    expect(moneyCollected[2]).to.be.eq(await erc20.balanceOf(lotteryDeployed.address));
  });

  it("Try to Pick Winners, Send Money to Winners and Reset before the order, Should Fail", async () => {
       
    await expect(lotteryDeployed.connect(owner).pickWinners()).to.be.revertedWith("Please Select Winner Numbers");
    await expect(lotteryDeployed.connect(owner).sendMoneyToWinners()).to.be.revertedWith("Raffle hasn't completed yet");
    await expect(lotteryDeployed.connect(owner).reset()).to.be.revertedWith("Raffle hasn't closed yet");


  });

  it("Set Number of Winners more than participants expect Revert ", async () => {

    await expect(
      lotteryDeployed.connect(owner).howManyWillBePicked(10)
    ).to.be.revertedWith("Can't be greater than the total participants!");
  });

  it("Set Number of Winners and Pick ", async () => {
 
    await lotteryDeployed.connect(owner).howManyWillBePicked(2);
    await lotteryDeployed.connect(owner).pickWinners();
    let winners = await lotteryDeployed.connect(owner).getWinners();
   /*  console.log(winners); */
  });

  it("Send Money to winners", async () => {
 
    await lotteryDeployed.connect(owner).sendMoneyToWinners();

    console.log(await erc20.balanceOf(owner.address));
    console.log(await erc20.balanceOf(fringe.address));
    console.log(await erc20.balanceOf(scheback.address));
    console.log(await erc20.balanceOf(sawakaga.address));
    console.log(await erc20.balanceOf(skygge.address));
    console.log(await erc20.balanceOf(woodcutter.address));
    console.log(await erc20.balanceOf(ysirblack.address));
    console.log(await erc20.balanceOf(mercy.address));
  });

  it("Reset", async () => {
 
    await lotteryDeployed.connect(owner).reset();
    const lotteryStatus = await lotteryDeployed.connect(owner).lottery();
    expect(lotteryStatus[0],"Status").to.be.eq(1);
    expect(lotteryStatus[1],"Total Number of People").to.be.eq(0);
    expect(lotteryStatus[2],"Collected Money").to.be.eq(0);
    expect(lotteryStatus[3],"the Fee amount").to.be.eq(0);

  
  });
});
