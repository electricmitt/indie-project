const Cards = artifacts.require('Cards');
const assert = require('assert');

contract('Cards', (accounts) => {
    const BUYER = accounts[1];
    const CARD_ID = 0;

    it('should allow a user to buy a ticket', async () => {
        const instance = await Cards.deployed();
        const originalCard = await instance.cards(
            CARD_ID
        );
        await instance.buyCard(CARD_ID, {
            from: BUYER, 
            value: originalCard.price,
        });
    });
    const updatedCard = await instance.cards(
        CARD_ID
    );
    assert.equal(updatedCard.owner,
    BUYER, 
    'the buyer should now own this card'
    );
});