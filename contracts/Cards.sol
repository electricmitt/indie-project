pragma solidity >=0.4.22 <0.9.0;




contract Cards {
    address public owner = msg.sender;
    uint256 constant public TOTAL_CARDS = 10;

    struct Card {
        uint256 price;
        address owner;
    }

    Card[TOTAL_CARDS] public cards;

    constructor() public {
        for (uint256 i = 0; i < TOTAL_CARDS; i++) {
            cards[i].price = 1e17; // 0.1 ETH
            cards[i].owner = address(0x0);
        } 
    }

    function buyCard(uint256 _index) external payable {
        require(_index < TOTAL_CARDS && _index >= 0);
        require(cards[_index].owner == address(0x0));
        require(msg.value >= cards[_index].price);
        cards[_index].owner = msg.sender;
    }
}