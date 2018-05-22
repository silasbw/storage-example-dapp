const { web3 } = require('./config');

async function main({ ether, from = 0, to = 1 }) {
  const wei = web3.utils.toWei(ether, 'ether');
  const accounts = await web3.eth.getAccounts();
  // https://web3js.readthedocs.io/en/1.0/web3-eth.html#sendtransaction
  const res = await web3.eth.sendTransaction({ from: accounts[from], to: accounts[to], value: wei });
}

// Specify currency as strings. JavaScript numbers are 64-bit floats, which
// aren't necessarily precise.
main({ ether: '1' })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
