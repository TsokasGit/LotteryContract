// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Lottery{

    enum Stage {Init, Reg, Bid, Done}
    Stage public stage;

    // Var declaration
    address public admin;
    uint public playercount = 0;
    Person[] bidders;
    Item[] items;
    bool alreadyRegistered;
    address winner;
    address[] winners;
    event Winner(address, uint, uint);
    uint lotteryNo = 0;

    bool public personFound;
    bool public itemFound;

    // Person's body
    struct Person{
        uint personid;
        address addr;
        uint remainingTokens;
    }

    // Item's body
    struct Item{
        uint itemID;
        uint[] itemTokens;
        address[] players;
    }

    // Run on deployment
    constructor() {
        admin = msg.sender;

        Item storage memItem = items.push();

        memItem.itemID = 0;
        items.push(memItem);
    }

    // Owner check modifier
    modifier onlyOwner{
        require(msg.sender == admin);
        _;
    }

    function register() public payable {
        require(stage == Stage.Reg, "Contract not yet initialized");
        require(msg.value >= 0.005 ether, "You don't have the required balance to register");
        require(msg.sender != admin);
        alreadyRegistered = false;
        for(uint i = 0; i < bidders.length; i++){
            if(bidders[i].addr == msg.sender){
                alreadyRegistered = true;
                break;
            }
        }
        require(alreadyRegistered == false, "Sorry, you are already registered");
        // Temporary declare the newly registered person
        Person memory _persons;
        _persons.personid = playercount;
        _persons.addr = msg.sender;
        _persons.remainingTokens = 5;
        //Add to the array
        bidders.push(_persons);
        // Increment the player count
        playercount++;
    }

    function bid(uint _itemId, uint _count) public payable {
        require(stage == Stage.Bid, "You need to register first");
        bool found;
        bool itemExists;
        uint biddersID;

        // Player for loop
        for(uint player; player < bidders.length; player++){
            if(bidders[player].addr == msg.sender){
                found = true;
                biddersID = player;
                break;
            } else {
                found = false;
            }
        }

        for(uint item; item < items.length; item++){
            if(items[item].itemID == _itemId){
                itemExists = true;
            } else {
                itemExists = false;
            }
        }

        require(found = true && bidders[biddersID].remainingTokens >= _count, "Player not found, or balance not enough");
        require(itemExists, "Item does not exist");
        // Checks Successful
        bidders[biddersID].remainingTokens -= _count;
        items[_itemId].itemTokens.push(_count);
        items[_itemId].players.push(msg.sender);
    }

    function revealWinners() public payable onlyOwner{
        require(stage == Stage.Done, "You need to bid first");
        uint div = 0;
        for(uint item = 0; item < items.length; item++){
            for(uint j = 0; j < items[item].itemTokens.length; j++){
                if(items[item].itemTokens[j] > 0 ){
                winner = payable(items[item].players[uint(keccak256(abi.encodePacked(block.prevrandao,block.timestamp,items[item].players.length))) % items[item].players.length]);
                div++;
                winners.push(winner);
                emit Winner(winner, item, lotteryNo);
                payable(winner).transfer((address(this).balance) / div);
            }
            }
        }
    }



    function withdraw() public onlyOwner {
        payable (msg.sender).transfer(address(this).balance); 
    }

    function reset() public onlyOwner {
        delete bidders;
        delete items;
        delete winners;
        stage = Stage.Init;
        lotteryNo++;
    }

    function advanceState(uint x) public onlyOwner{
        if(x == 0){
            stage = Stage.Init;
        } else if(x == 1){
            stage = Stage.Reg;
        } else if(x == 2){
            stage = Stage.Bid;
        } else if(x == 3){
            stage = Stage.Done;
        }
    }
}