"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const chai_1 = require("chai");
describe("lotteryDeployed Test", () => {
    let [owner, fringe, scheback, sawakaga, skygge, woodcutter, ysirblack, mercy,] = [];
    let ERC20Factory;
    let erc20;
    let LotteryFactory;
    let lotteryDeployed;
    it("Deploy lotteryDeployed", () => __awaiter(void 0, void 0, void 0, function* () {
        [owner, fringe, scheback, sawakaga, skygge, woodcutter, ysirblack, mercy] =
            (yield hardhat_1.ethers.getSigners());
        LotteryFactory = (yield hardhat_1.ethers.getContractFactory("LotteryV4"));
        lotteryDeployed = (yield LotteryFactory.deploy());
        yield lotteryDeployed.deployed();
        const deployEden = yield lotteryDeployed.callStatic.owner(); //await eklemeyi unutma!//callStatic'te call methodu gibi web3 de blockchainde state değiştirmeyen çağrılarda kullanılıyor
        // const deployEden = await lotteryDeployed.connect(owner).callStatic.owner();//böylede çalıştı
        // const deployEden = await lotteryDeployed.owner();// böyle de çalıştı;
        (0, chai_1.expect)(deployEden).to.be.eq(owner.address);
    }));
    it("Deploy Token and mint", () => __awaiter(void 0, void 0, void 0, function* () {
        ERC20Factory = (yield hardhat_1.ethers.getContractFactory("mockToken"));
        erc20 = (yield ERC20Factory.deploy("denem", "dnm", (1000000).toString()));
        yield erc20.deployed();
        const balanceOfOwner = yield erc20.connect(owner).balanceOf(owner.address);
        (0, chai_1.expect)((1000000).toString()).to.be.eq(balanceOfOwner);
    }));
    it("Send token to all people and Set token address", () => __awaiter(void 0, void 0, void 0, function* () {
        const sharedMoney = (125000).toString();
        yield erc20.connect(owner).transfer(fringe.address, sharedMoney);
        yield erc20.connect(owner).transfer(scheback.address, sharedMoney);
        yield erc20.connect(owner).transfer(sawakaga.address, sharedMoney);
        yield erc20.connect(owner).transfer(skygge.address, sharedMoney);
        yield erc20.connect(owner).transfer(woodcutter.address, sharedMoney);
        yield erc20.connect(owner).transfer(ysirblack.address, sharedMoney);
        yield erc20.connect(owner).transfer(mercy.address, sharedMoney);
        yield lotteryDeployed.connect(owner).addTokenAddress(erc20.address);
        const balanceOfOwner = yield erc20
            .connect(owner)
            .callStatic.balanceOf(owner.address);
        (0, chai_1.expect)(balanceOfOwner).to.be.eq(sharedMoney);
        yield erc20.connect(mercy).transfer(owner.address, sharedMoney);
    }));
    it("Approve and Registery before Starting => Should Revert ", () => __awaiter(void 0, void 0, void 0, function* () {
        const approvedAmount = 500;
        yield erc20.connect(owner).approve(lotteryDeployed.address, approvedAmount);
        yield erc20.connect(fringe).approve(lotteryDeployed.address, approvedAmount);
        yield erc20.connect(scheback).approve(lotteryDeployed.address, approvedAmount);
        yield erc20.connect(sawakaga).approve(lotteryDeployed.address, approvedAmount);
        yield erc20.connect(skygge).approve(lotteryDeployed.address, approvedAmount);
        yield erc20.connect(woodcutter).approve(lotteryDeployed.address, approvedAmount);
        yield erc20.connect(ysirblack).approve(lotteryDeployed.address, approvedAmount);
        //await erc20.connect(mercy).approve(lotteryDeployed.address, 500);
        yield (0, chai_1.expect)(lotteryDeployed.connect(owner).register()).to.be.revertedWith("Hasn't started yet!");
        yield (0, chai_1.expect)(lotteryDeployed.connect(fringe).register()).to.be.revertedWith("Hasn't started yet!");
        yield (0, chai_1.expect)(lotteryDeployed.connect(scheback).register()).to.be.revertedWith("Hasn't started yet!");
        yield (0, chai_1.expect)(lotteryDeployed.connect(sawakaga).register()).to.be.revertedWith("Hasn't started yet!");
        yield (0, chai_1.expect)(lotteryDeployed.connect(skygge).register()).to.be.revertedWith("Hasn't started yet!");
        yield (0, chai_1.expect)(lotteryDeployed.connect(woodcutter).register()).to.be.revertedWith("Hasn't started yet!");
        yield (0, chai_1.expect)(lotteryDeployed.connect(ysirblack).register()).to.be.revertedWith("Hasn't started yet!");
    }));
    it("Set the Fee and Let Them Register Theirselves ", () => __awaiter(void 0, void 0, void 0, function* () {
        yield lotteryDeployed.connect(owner).setFee(500);
        yield lotteryDeployed.connect(owner).register();
        yield lotteryDeployed.connect(fringe).register();
        yield lotteryDeployed.connect(scheback).register();
        yield lotteryDeployed.connect(sawakaga).register();
        yield lotteryDeployed.connect(skygge).register();
        yield lotteryDeployed.connect(woodcutter).register();
        yield lotteryDeployed.connect(ysirblack).register();
        yield (0, chai_1.expect)(lotteryDeployed.connect(mercy).register()).to.be.revertedWith("ERC20: transfer amount exceeds balance");
        console.log(yield erc20.balanceOf(owner.address));
        console.log(yield erc20.balanceOf(fringe.address));
        console.log(yield erc20.balanceOf(scheback.address));
        console.log(yield erc20.balanceOf(sawakaga.address));
        console.log(yield erc20.balanceOf(skygge.address));
        console.log(yield erc20.balanceOf(woodcutter.address));
        console.log(yield erc20.balanceOf(ysirblack.address));
        console.log(yield erc20.balanceOf(mercy.address));
        const numberOfPeople = yield lotteryDeployed.lottery();
        const moneyCollected = yield lotteryDeployed.lottery();
        (0, chai_1.expect)(numberOfPeople[1]).to.be.eq(7);
        (0, chai_1.expect)(moneyCollected[2]).to.be.eq(yield erc20.balanceOf(lotteryDeployed.address));
    }));
    it("Try to Pick Winners, Send Money to Winners and Reset before the order, Should Fail", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, chai_1.expect)(lotteryDeployed.connect(owner).pickWinners()).to.be.revertedWith("Please Select Winner Numbers");
        yield (0, chai_1.expect)(lotteryDeployed.connect(owner).sendMoneyToWinners()).to.be.revertedWith("Raffle hasn't completed yet");
        yield (0, chai_1.expect)(lotteryDeployed.connect(owner).reset()).to.be.revertedWith("Raffle hasn't closed yet");
    }));
    it("Set Number of Winners more than participants expect Revert ", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, chai_1.expect)(lotteryDeployed.connect(owner).howManyWillBePicked(10)).to.be.revertedWith("Can't be greater than the total participants!");
    }));
    it("Set Number of Winners and Pick ", () => __awaiter(void 0, void 0, void 0, function* () {
        yield lotteryDeployed.connect(owner).howManyWillBePicked(2);
        yield lotteryDeployed.connect(owner).pickWinners();
        let winners = yield lotteryDeployed.connect(owner).getWinners();
        /*  console.log(winners); */
    }));
    it("Send Money to winners", () => __awaiter(void 0, void 0, void 0, function* () {
        yield lotteryDeployed.connect(owner).sendMoneyToWinners();
        console.log(yield erc20.balanceOf(owner.address));
        console.log(yield erc20.balanceOf(fringe.address));
        console.log(yield erc20.balanceOf(scheback.address));
        console.log(yield erc20.balanceOf(sawakaga.address));
        console.log(yield erc20.balanceOf(skygge.address));
        console.log(yield erc20.balanceOf(woodcutter.address));
        console.log(yield erc20.balanceOf(ysirblack.address));
        console.log(yield erc20.balanceOf(mercy.address));
    }));
    it("Reset", () => __awaiter(void 0, void 0, void 0, function* () {
        yield lotteryDeployed.connect(owner).reset();
        const lotteryStatus = yield lotteryDeployed.connect(owner).lottery();
        (0, chai_1.expect)(lotteryStatus[0], "Status").to.be.eq(1);
        (0, chai_1.expect)(lotteryStatus[1], "Total Number of People").to.be.eq(0);
        (0, chai_1.expect)(lotteryStatus[2], "Collected Money").to.be.eq(0);
        (0, chai_1.expect)(lotteryStatus[3], "the Fee amount").to.be.eq(0);
    }));
});
