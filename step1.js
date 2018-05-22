const { web3 } = require('./config');

async function main() {
  // Public keys for all the accounts the node manages.
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);
};

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
