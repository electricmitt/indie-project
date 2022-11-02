pragma solidity >=0.4.22 <0.9.0;


uint256 constant TOTAL_INDIE = 10;

contract Indie {
    address public owner = msg.sender;

    struct Ticket {
        uint256 price;
        address owner;
    }

    Indie[TOTAL_INDIE] public tickets;

    constructor() {
        for (uint256 i = 0; i < TOTAL_INDIE; i++) {
            tickets[i].price = 1e17; // 0.1 ETH
            tickets[i].owner = address(0x0);
        } 
    }


}