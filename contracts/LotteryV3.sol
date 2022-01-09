// SPDX-License-Identifier: MIT
pragma solidity 0.8.5;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/dev/VRFConsumerBase.sol";


contract LotteryV3 is Ownable,VRFConsumerBase{

    event Random(uint256 randomNumber);
    event TokenAddress(address token);
    event WhoRegistered(address person);


    mapping(uint => address)  public registredPeople;
    mapping(address => bool ) secildiMi;

    uint256   public   toplamKisi;
    uint256   public   birikenPara;
    uint256   public   rastgele;
    address[] public   kazananlar;
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

    function register() public returns(bool) {
        require(token.transferFrom(msg.sender,address(this), 500 ));
        registredPeople[toplamKisi] = msg.sender;
        toplamKisi++;
        birikenPara += 500;

        emit WhoRegistered( msg.sender);
        return true;
    }
    function howManyWillBePicked(uint256 _number) public {
        require(_number <= toplamKisi,"Can't be greater than the total participants!");
        kacTaneSecilsin = _number;
        kazananlar = new address[](_number);
    }
  
    function pickWinners() external onlyOwner {

        //getRandomNumber();
        bool _continue = true;
        uint256 index = 0;
        uint256 hashIndex = 0;
       // address[] memory winningAddress = new address[](kacTaneSecilsin);

          while (_continue == true) {
              //block.timestamp, "rastgele" ile değiştirilecek publice çıkınca
            bytes32 hashOfRandom = keccak256(abi.encodePacked(uint256(kacTaneSecilsin),hashIndex,block.timestamp));
            uint256 numberRepresentation = uint256(hashOfRandom);
            uint256 pickedNumber = ((numberRepresentation) % toplamKisi);
            address winner = registredPeople[pickedNumber];
            
            if (secildiMi[winner] == false) {
                secildiMi[winner] = true;
                kazananlar[index] = winner;
                //winningAddress[index] = winner;
        
                index++;
            }
            
            hashIndex++;
            if (index == kacTaneSecilsin) {
                _continue = false;
            }
        }
       // return winningAddress;
    }
    function getWinners() external view returns(address[] memory) {
        return kazananlar;
    }

    function sendMoneyToWinners() public onlyOwner {
        uint256 sharedMoney;
        sharedMoney = birikenPara / kacTaneSecilsin;
        for(uint256 i = 0; i < kacTaneSecilsin; i++){
            token.transfer(kazananlar[i],sharedMoney);
        }
    }
 

}