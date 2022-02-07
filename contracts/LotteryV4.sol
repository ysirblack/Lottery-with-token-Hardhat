// SPDX-License-Identifier: MIT
pragma solidity 0.8.5;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

enum Status {
    NotStarted,
    Open, 
    Closed, 
    Completed 
}

struct LotteryInfo {
    Status    lotteryStatus;
    uint256   toplamKisi;
    address[] kazananlar;
    uint256   birikenPara;
    uint256   fee;
}

contract LotteryV4 is Ownable,VRFConsumerBase{

    event Random(uint256 randomNumber);
    event TokenAddress(address token);
    event WhoRegistered(address person);

    mapping(uint => address)  public registredPeople;
    mapping(address => bool ) secildiMi;

    LotteryInfo public lottery;

    modifier shouldBeOpen(){
        require(lottery.lotteryStatus == Status.Open,"Hasn't started yet!");
        _;
    }

    modifier shouldBeCompleted(){
        require(lottery.lotteryStatus == Status.Completed,"Raffle hasn't completed yet");
        _;
    }
    modifier shouldBeClosed(){
        require(lottery.lotteryStatus == Status.Closed,"Raffle hasn't closed yet");
        _;
    }

    uint256   public   rastgele;
    bytes32   internal keyHash;
    uint256   internal fee;
    uint256   internal kacTaneSecilsin;

    IERC20 token;


    /*  0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9, // VRF Coordinator kovan network
    0xa36085F69e2889c224210F603D836748e7dC0088  // LINK Token */
   constructor()  VRFConsumerBase(
            0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9, // VRF Coordinator
            0xa36085F69e2889c224210F603D836748e7dC0088  // LINK Token
        )
    {
        keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
        fee = 0.1 * 10 ** 18; // 0.1 LINK (Varies by network)
    }
    function getRandomNumber() public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        return requestRandomness(keyHash, fee);
    }

    function withdrawLINK() public onlyOwner{
        LINK.transfer(msg.sender,LINK.balanceOf(address(this)));
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 , uint256 randomness) internal override {
        rastgele = randomness;
        emit Random(rastgele);
    }

    function addTokenAddress(address _token) public onlyOwner {
        
        token = IERC20(_token);
        emit TokenAddress(_token);

    }

    function setFee(uint256 _fee) public onlyOwner {
        
        lottery.fee = _fee;
        lottery.lotteryStatus = Status.Open;

    }


    function register() public shouldBeOpen returns(bool) {
        require(token.transferFrom(msg.sender,address(this), lottery.fee));
        registredPeople[lottery.toplamKisi] = msg.sender;
        lottery.toplamKisi++;
        lottery.birikenPara +=  lottery.fee;

        emit WhoRegistered( msg.sender);
        return true;
    }

    function howManyWillBePicked(uint256 _number) public onlyOwner {
        require(_number <= lottery.toplamKisi,"Can't be greater than the total participants!");
        kacTaneSecilsin = _number;
        lottery.kazananlar = new address[](_number);
    }
  
    function pickWinners() external onlyOwner {
        require(kacTaneSecilsin > 0,"Please Select Winner Numbers");
        lottery.lotteryStatus = Status.Completed;
        //getRandomNumber();
        bool _continue = true;
        uint256 index = 0;
        uint256 hashIndex = 0;
       

          while (_continue == true) {
              //block.timestamp, "rastgele" ile değiştirilecek publice çıkınca
            bytes32 hashOfRandom = keccak256(abi.encodePacked(uint256(kacTaneSecilsin),hashIndex,block.timestamp));
            uint256 numberRepresentation = uint256(hashOfRandom);
            uint256 pickedNumber = ((numberRepresentation) % lottery.toplamKisi);
            address winner = registredPeople[pickedNumber];
            
            if (secildiMi[winner] == false) {
                secildiMi[winner] = true;
                lottery.kazananlar[index] = winner;
        
                index++;
            }
            
            hashIndex++;
            if (index == kacTaneSecilsin) {
                _continue = false;
            }
        }
    }

    function getWinners() external view returns(address[] memory) {
        return lottery.kazananlar;
    }

    function sendMoneyToWinners() public onlyOwner shouldBeCompleted {
        uint256 sharedMoney;
        sharedMoney = lottery.birikenPara / kacTaneSecilsin;
        for(uint256 i = 0; i < kacTaneSecilsin; i++){
            token.transfer(lottery.kazananlar[i],sharedMoney);
        }
        lottery.lotteryStatus = Status.Closed;
    }

    function reset() public  onlyOwner shouldBeClosed {
        lottery.kazananlar = new address[](0);
        lottery.birikenPara = 0;
        kacTaneSecilsin = 0;
        lottery.toplamKisi = 0;
        lottery.fee = 0;
        lottery.lotteryStatus = Status.Open;
    }

}