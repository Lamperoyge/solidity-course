const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile.js');

//interface === abi

const web3Instance = new Web3(ganache.provider());

//ganache is a test RPC. web3 require a provider ( which in our case in ganache );
//insert as provider whatever chain you want to connect to

//before each deploy a contract
let inbox;
let accounts;

const initialMessage = 'initial message';
beforeEach(async () => {
  // get a list of all accounts

  accounts = await web3Instance.eth.getAccounts();

  console.log(accounts);
  // use one of those accounts to deploy the contract
  inbox = await new web3Instance.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [initialMessage],
    })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('inbox contract', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('sets a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, initialMessage);
  });

  it('sets a new message', async () => {
    const newMessageText = 'new msg';
    await inbox.methods
      .setMessage(newMessageText)
      .send({ from: accounts[1], gas: '100000' });
    const message = await inbox.methods.message().call();
    assert.equal(message, newMessageText);
  });
});
