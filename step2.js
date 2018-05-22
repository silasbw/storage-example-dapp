const { web3 } = require('./config');

async function main() {
  const accounts = await web3.eth.getAccounts();
  accounts.forEach(async account => {
    // Wei is 1/1000000000000000000 of an ether. It's the smallest unit of
    // currency in Ethereum.
    const wei = await web3.eth.getBalance(account);
    const ether = web3.utils.fromWei(wei);
    console.log(`${ account }: wei ${ wei } ether ${ ether }`);
  });
};

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
