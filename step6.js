const { provider, web3 } = require('./config');
const Contract = require('./lib/contract');
const contract = new Contract({ provider });
const Storage = contract.require('Storage');

async function main() {
  const accounts = await web3.eth.getAccounts();
  const ownerAccount = accounts[0];

  const instance = await Storage.deployed();
  //
  // "Call" to get the current value
  //
  const currentValue = (await instance.get()).toString();
  console.log(`Current value: ${ currentValue }`);

  //
  // "Transact" to set a new value
  //
  const newValue = (parseInt(currentValue, 10) + 1).toString();
  // Estimate the gas required to make the transaction
  const gas = (await instance
               .set
               .estimateGas(newValue, { from: ownerAccount }));
  console.log(`Need ${ gas } to set value`);

  // Actually execute the transaction!
  const res = await instance.set(newValue, { from: ownerAccount, gas });
  console.log(`Set tx ${ res.tx }`);

  // See what we ended up with
  const updatedValue = (await instance.get()).toString();
  console.log(`Updated value: ${ updatedValue }`);
}

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
