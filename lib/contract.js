//
// truffle-contract provides a wrapper around:
//   const web3 = new Web3(
//     new Web3.providers.HttpProvider('http://localhost:8545')
//   );
//   const data = require('./build/contracts/Storage.json');
//   const address = data.networks[Object.keys(data.networks)[0]].address;
//   const Storage = new web3.eth.Contract(data.abi, address);
//   Storage.methods.get().call().then(console.log);
//
const contract = require('truffle-contract');

class Contract {
  constructor(options) {
    this.provider = options.provider;
  }

  /**
   * Load a contract in the current project by name.
   *
   * @param {string} name - contract name (e.g., "Storage")
   * @returns {object} Contract binding object
   */
  require(name) {
    const data = require(`../build/contracts/${ name }.json`);
    const Binding = contract(data);
    Binding.setProvider(this.provider);
    //
    // See https://github.com/trufflesuite/truffle-contract/issues/56
    //
    Binding.currentProvider.sendAsync = function () {
      return Binding.currentProvider.send.apply(Binding.currentProvider, arguments);
    };
    return Binding;
  }
}

module.exports = Contract;
