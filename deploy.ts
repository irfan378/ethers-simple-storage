import { ethers } from "ethers";
import "dotenv/config";
import * as fs from "fs-extra";

async function main() {
  // Connect to ganche blockchain
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  // const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  const encryptedJson=fs.readFileSync('./encryptedKey.json',"utf-8")
let wallet= ethers.Wallet.fromEncryptedJsonSync(encryptedJson,process.env.PRIVATE_KEY_PASSWORD!)
wallet=await wallet.connect(provider)
  // read from abi
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  // read from binary
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying Please Wait.....");
  // const contract=await contractFactory.deploy({gasPrice:100000}) // for adding function overrides
  const contract = await contractFactory.deploy();
  // const transactionReceipt = await contract.deployTransaction.wait(1);
  await contract.deployTransaction.wait(1);
  //get nonce count value from wallet
  // const nonce =await wallet.getTransactionCount()
  //Deploy with transaction data
  // const tx:any = {
  //     nonce: nonce,
  //     gasPrice: 20000,
  //     gasLimit: 1000,
  //     to: null,
  //     value: 0,
  //     data: "0x60806040526040518060400160405280600281526020016040518060400160405280600381526020017f6162630000000000000000000000000000000000000000000000000000000000815250815250600160008201518160000155602082015181600101908051906020019061007792919061008c565b50505034801561008657600080fd5b50610190565b8280546100989061012f565b90600052602060002090601f0160209004810192826100ba5760008555610101565b82601f106100d357805160ff1916838001178555610101565b82800160010185558215610101579182015b828111156101005782518255916020019190600101906100e5565b5b50905061010e9190610112565b5090565b5b8082111561012b576000816000905550600101610113565b5090565b6000600282049050600182168061014757607f821691505b6020821081141561015b5761015a610161565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6108748061019f6000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c806377ec2b551161005b57806377ec2b55146100d85780639e7a13ad146100f7578063b2ac62ef14610128578063c7a0d9f6146101585761007d565b80632e64cec1146100825780636057361d146100a05780636f760f41146100bc575b600080fd5b61008a610176565b604051610097919061062d565b60405180910390f35b6100ba60048036038101906100b59190610570565b61017f565b005b6100d660048036038101906100d19190610514565b610189565b005b6100e0610219565b6040516100ee929190610648565b60405180910390f35b610111600480360381019061010c9190610570565b6102b3565b60405161011f929190610648565b60405180910390f35b610142600480360381019061013d91906104cb565b61036f565b60405161014f919061062d565b60405180910390f35b61016061039d565b60405161016d919061062d565b60405180910390f35b60008054905090565b8060008190555050565b600360405180604001604052808381526020018481525090806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010190805190602001906101ef9291906103a3565b505050806004836040516102039190610616565b9081526020016040518091039020819055505050565b600180600001549080600101805461023090610741565b80601f016020809104026020016040519081016040528092919081815260200182805461025c90610741565b80156102a95780601f1061027e576101008083540402835291602001916102a9565b820191906000526020600020905b81548152906001019060200180831161028c57829003601f168201915b5050505050905082565b600381815481106102c357600080fd5b90600052602060002090600202016000915090508060000154908060010180546102ec90610741565b80601f016020809104026020016040519081016040528092919081815260200182805461031890610741565b80156103655780601f1061033a57610100808354040283529160200191610365565b820191906000526020600020905b81548152906001019060200180831161034857829003601f168201915b5050505050905082565b6004818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b60005481565b8280546103af90610741565b90600052602060002090601f0160209004810192826103d15760008555610418565b82601f106103ea57805160ff1916838001178555610418565b82800160010185558215610418579182015b828111156104175782518255916020019190600101906103fc565b5b5090506104259190610429565b5090565b5b8082111561044257600081600090555060010161042a565b5090565b60006104596104548461069d565b610678565b90508281526020810184848401111561047557610474610807565b5b6104808482856106ff565b509392505050565b600082601f83011261049d5761049c610802565b5b81356104ad848260208601610446565b91505092915050565b6000813590506104c581610827565b92915050565b6000602082840312156104e1576104e0610811565b5b600082013567ffffffffffffffff8111156104ff576104fe61080c565b5b61050b84828501610488565b91505092915050565b6000806040838503121561052b5761052a610811565b5b600083013567ffffffffffffffff8111156105495761054861080c565b5b61055585828601610488565b9250506020610566858286016104b6565b9150509250929050565b60006020828403121561058657610585610811565b5b6000610594848285016104b6565b91505092915050565b60006105a8826106ce565b6105b281856106d9565b93506105c281856020860161070e565b6105cb81610816565b840191505092915050565b60006105e1826106ce565b6105eb81856106ea565b93506105fb81856020860161070e565b80840191505092915050565b610610816106f5565b82525050565b600061062282846105d6565b915081905092915050565b60006020820190506106426000830184610607565b92915050565b600060408201905061065d6000830185610607565b818103602083015261066f818461059d565b90509392505050565b6000610682610693565b905061068e8282610773565b919050565b6000604051905090565b600067ffffffffffffffff8211156106b8576106b76107d3565b5b6106c182610816565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000819050919050565b82818337600083830152505050565b60005b8381101561072c578082015181840152602081019050610711565b8381111561073b576000848401525b50505050565b6000600282049050600182168061075957607f821691505b6020821081141561076d5761076c6107a4565b5b50919050565b61077c82610816565b810181811067ffffffffffffffff8211171561079b5761079a6107d3565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b610830816106f5565b811461083b57600080fd5b5056fea26469706673582212201399adc8b0808556807e0b6263db129d2623b08ecbca6ef1e58ed70e8cfc8d8064736f6c63430008070033",
  //     chainId:5777
  //   };
  //sign transaction
  //const signedTxResponse=await wallet.signTransaction(tx)
  // const sentTxResponse=await wallet.sendTransaction(tx)
  // await sentTxResponse.wait(1)

  // console.log(sentTxResponse)
  // console.log("Deployment Transaction")
  // console.log(contract.deployTransaction)
  // console.log("Deployment Receipt")
  // console.log(transactionReceipt)
  let contractFavouriteNumber = await contract.retrieve();
  console.log(`Current Favourite Number:${contractFavouriteNumber.toString()}`);
  const transactionResponse = await contract.store("7");
  console.log(transactionResponse)
  const transactionReceipt = await transactionResponse.wait(1);
  contractFavouriteNumber = await contract.retrieve();
  console.log(`Updated Favourite Number:${contractFavouriteNumber.toString()}`);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
