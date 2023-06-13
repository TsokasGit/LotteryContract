// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract GoldenBallot{

    address public winner;
    bool public winnersRevealed = false;

    address[] public winners;
    address[] public bidders;
    address[2] public admins;
    Item[3] public items;
    uint[3] public ballotCounter;

    modifier onlyOwner{
    require(msg.sender == admins[0] || msg.sender == admins[1]);
    _;
    }

    struct Item {
        uint itemID;
        address[] players;
        address winnerItem;
    }

    function printBalance() public view returns (uint) {
        return address(this).balance;
    }

    function reset() onlyOwner public {
        delete winners;
        
        for(uint x = 0; x < items.length; x++){
            items[x].itemID = 0;
            delete items[x].players;
            items[x].winnerItem = 0x0000000000000000000000000000000000000000;
            ballotCounter[x] = 0;
        }

        winnersRevealed = false;
        winnedItems = "Winners has not been revealed yet.";
        
    }

    function bid(uint _itemID) public payable{
        require(msg.sender != admins[0] && msg.sender != admins[1]);
        require(winnersRevealed == false);
        require(msg.value >= 0.001 ether);
        items[_itemID].players.push(msg.sender);
        ballotCounter[_itemID]++;
    }

    function getItemAddress(uint _itemID, uint test) public view returns (address) {
        return items[_itemID].players[test];
    }

    constructor(){
        admins[0] = msg.sender;
        admins[1] = 0x153dfef4355E823dCB0FCc76Efe942BefCa86477;

        items[0].itemID = 0;
        items[1].itemID = 1;
        items[2].itemID = 2;

        ballotCounter[0] = 0;
        ballotCounter[1] = 0;
        ballotCounter[2] = 0;
    }

    function withdraw() onlyOwner public payable{
        payable (msg.sender).transfer(address(this).balance); 
    }


    uint[] public winnersIndex;
    string public winnedItems = "Winners has not been revealed yet.";
    function amIWinner() public {
        require(winnersRevealed == true, "Winners has not been revealed yet.");
        winnedItems = "You have won nothing. Better luck next time.";
        delete winnersIndex;
        for(uint i; i < items.length; i++){
            if(items[i].winnerItem == msg.sender){
                winnersIndex.push(i);
                string memory car = "";
                string memory phone = "";
                string memory computer = "";
                    for(uint x = 0; x < winnersIndex.length; x++){
                        // Check if the player who pressed the amIWinner button has won a car.
                        if(winnersIndex[x] == 0){
                            car = " Car ";
                        // Check if the player who pressed the amIWinner button has won a phone.
                        } else if(winnersIndex[x] == 1){
                            phone = " Phone ";
                        // Check if the player who pressed the amIWinner button has won a computer.
                        } else if (winnersIndex[x] == 2){
                            computer = " Computer ";
                        }
                    }
                    winnedItems = string.concat("You have won the following: ",car, phone, computer);
            }
        }
    }
    

    function declareWinner() onlyOwner public payable {
        winnersRevealed = true;
        uint counter = 0;
        for(uint item = 0; item < items.length; item++){
            if(ballotCounter[item] > 0){
                winner = payable(items[item].players[uint(keccak256(abi.encodePacked(block.prevrandao,block.timestamp,items[item].players.length))) % items[item].players.length]);
                items[item].winnerItem = winner;
                winners.push(winner);
                counter++;
            }
        }
        amIWinner();
    }

    function transferOwnership(uint _ownerIndex, address _newOwner) onlyOwner public {
        admins[_ownerIndex] = _newOwner;
    }

    function removeOwners() onlyOwner public {
        admins[0] = 0x0000000000000000000000000000000000000000;
        admins[1] = 0x0000000000000000000000000000000000000000;
    }
}