import { ethers } from "ethers";
import "dotenv/config"
import * as fs from "fs-extra"

async function main(){
    // Connect to ganche blockchain
    const provider=new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
    const wallet=new ethers.Wallet(process.env.PRIVATE_KEY!,provider)
    // read from abi
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")
    // read from binary
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin","utf8" )
    const contractFactory=new ethers.ContractFactory(abi,binary,wallet)
    console.log("Deploying Please Wait.....")    
    const contract=await contractFactory.deploy()
    console.log(contract)
}
main().then(()=>process.exit(0)).catch((error)=>{
    console.error(error)
    process.exit(1)
})