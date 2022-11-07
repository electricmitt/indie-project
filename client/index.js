import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.css';
import configuration from '../build/contracts/Cards.json';

const createdElementFromString = (string) => {
    const div = document.createdElement('div');
    div.innerHTML = string.trim();
    return div.firstChild;
}

const CONTRACT_ADDRESS = configuration.networks['5777'].address;
const CONTRACT_ABI = configuration.abi;

const web3 = new Web3(
    Web3.givenProvider || 'http://127.0.0.1/7545'
);
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

const TOTAL_CARDS = 10;
const EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";

let account;

const accountEl = document.getElementById('account');
const cardsEl = document.getElementById('cards');

const refreshCards = async () => {
    cardsEl.innerHTML = '';
    for(let i = 0; i < TOTAL_CARDS; i++) {
        const card = await contract.methods.cards(i).call();
        console.log(card);
        card.id = i;        
        if (card.owner === EMPTY_ADDRESS) {
          const cardEl = createdElementFromString(`<div class="card" style="width: 18rem;">
          <img src="..." class="card-img-top" alt="...">
          <div class="card-body">
            <p class="card-text">${ticket.price}</p>
            <button class="btn btn-primary">Buy</button>
          </div>
        </div>`);
        cardsEl.appendChild(cardEl);
        }
    }
};

const main = async () => {
    const accounts = await web3.eth.requestAccounts();
    account = accounts[0];
    accountEl.innerText = account;
    await refreshCards();
}

main();