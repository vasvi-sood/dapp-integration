import { TezosToolkit, MichelsonMap } from '@taquito/taquito';
// import { TezBridgeSigner } from '@taquito/tezbridge-signer';
import { InMemorySigner, importKey } from '@taquito/signer';

// import {
//   NetworkType,
//   BeaconEvent,
//   defaultEventCallbacks
// } from "@airgap/beacon-sdk";
import { BeaconWallet } from "@taquito/beacon-wallet";
// import { LedgerSigner } from "@taquito/ledger-signer";
// import { data, get } from 'jquery';


const connect=document.getElementById("connect");

import { TempleWallet } from "@temple-wallet/dapp";
import { NetworkType } from '@airgap/beacon-sdk';
connect?.addEventListener('click',async () => {
  try {
    const available = await TempleWallet.isAvailable();
    if (!available) {
      throw new Error("Temple Wallet not installed");
    }

    

    // use `TempleWallet.isAvailable` method only after web application fully loaded.

    // Alternatively, you can use the method `TempleWallet.onAvailabilityChange`
    // that tracks availability in real-time .

    const wallet = new TempleWallet("My Super DApp");
    
    await wallet.connect("edo2net");
    const tezos = wallet.toTezos();

    const accountPkh = await tezos.wallet.pkh();
    const accountBalance = await tezos.tz.getBalance(accountPkh);
    console.info(`address: ${accountPkh}, balance: ${accountBalance}`);

  //   const counter = await tezos.wallet.at(
  //     "KT1DjYkruvfujfKw6nLYafArqKufcwHuKXvT"
  //   );

  //   const operation = await counter.methods.increment(1).send();
  //   await operation.confirmation();

  //   const counterValue = await counter.storage();
  //   console.info(`count: ${counterValue}`);
  }
   catch (err) {
    console.error("error");
  }
});





// import { DAppClient } from "@airgap/beacon-sdk";


// let fun=async()=>{
//   const dAppClient = new DAppClient({ name: "Beacon Docs" });
//   try {
//     console.log("Requesting permissions...");
//     const permissions = await dAppClient.requestPermissions();
//     console.log("Got permissions:", permissions.address);
//   } catch (error) {
//     console.log("Got error:", error);
//   }
  
// }
// fun();



const addorg=document.getElementById("addorg");
const donate=document.getElementById("donate");
const btn = document.getElementById("show-balance-button");
const add=<HTMLInputElement>document.getElementById("address-input");
const bo=<HTMLParagraphElement>document.getElementById("balance");
//  const wallet= new BeaconWallet("https://edonet.smartpy.io");

let tezos = new TezosToolkit("https://edonet.smartpy.io")
// Tezos.setProvider({ signer: new TezBridgeSigner() });

const FAUCET_KEY = {
  "mnemonic": [
    "hammer",
    "gold",
    "make",
    "curtain",
    "beach",
    "faint",
    "key",
    "spoil",
    "void",
    "since",
    "never",
    "floor",
    "eagle",
    "intact",
    "transfer"
  ],
  "secret": "12ff7634636c5d8b1038e4444bb64fb0fb75f077",
  "amount": "44923792333",
  "pkh": "tz1NJyTWtLJubXQ4Th7VJvoiD4LBSvEQeSft",
  "password": "H12mLyeKW6",
  "email": "zewgdnne.uqlkwgrk@tezos.example.org"
}






importKey(
  tezos,
  FAUCET_KEY.email,
  FAUCET_KEY.password,
  FAUCET_KEY.mnemonic.join(' '),
  FAUCET_KEY.secret
  ).then((a)=>{}).catch((e) => console.error(`error`,e));
  
  // console.log(Tezos);
  let a= FAUCET_KEY.mnemonic.join(' ');
  tezos.setProvider({
    
     
  });

  const amount = 2;
const address = 'tz1h3rQ8wBxFd8L9B3d7Jhaawu6Z568XU3xY';

// console.log(`Transfering ${amount} ꜩ to ${address}...`);
// Tezos.contract
//   .transfer({ to: address, amount: amount })
//   .then((op) => {
//     console.log(`Waiting for ${op.hash} to be confirmed...`);
//     return op.confirmation(1).then(() => op.hash);
//   })
//   .then((hash) => console.log(`Operation injected: https://edo.tzstats.com/${hash}`))
//   .catch((error) => console.log(`Error: ${error} ${JSON.stringify(error, null, 2)}`));

const org={
  name:'name',
  email:'email'
}

 addorg?.addEventListener('click',()=>{
  tezos.contract
  .at('KT1AwinTSnZDEntaLskuaJ8SQ62f2qXw2wDW')
  .then((contract) => {
    // console.log(contract);
   return contract.methods.addCause('em','vasvi').send()
  }).then((op) => {
    console.log(op);
    console.log(`Waiting for ${op.hash} to be confirmed...`);
    return op.confirmation(1).then(() => op.hash);
  })
  .then((hash) => console.log(`Operation injected: https://edo.tzstats.com/${hash}`))
  .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));

 }
 )
donate?.addEventListener('click',()=>{
  tezos.contract
  .at('KT1AwinTSnZDEntaLskuaJ8SQ62f2qXw2wDW')
  .then((contract) => {
    // console.log(contract);
   return contract.methods.donate(7,1,1).send()
  }).then((op) => {
    console.log(op);
    console.log(`Waiting for ${op.hash} to be confirmed for sending donation`);
    return op.confirmation(1).then(() => op.hash);
  })
  .then((hash) => console.log(`Operation injected: https://edo.tzstats.com/${hash}`))
  .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
})


const init=async()=>{
  try{
    tezos.contract
    .at('KT1AwinTSnZDEntaLskuaJ8SQ62f2qXw2wDW')
    .then(async(contract) => {
      // console.log(contract);
    const storag=await contract.storage()
    
    console.log(storag);

    })
  }
  catch(e)
  {

  }
}

btn?.addEventListener('click',()=>{
  let abc=add.value;
  console.log("here",abc);
  tezos.rpc.getBalance(abc).then(balance => console.log(balance.toNumber() / 1000000)).catch(e => console.log("Address not found"));

})
  

const wallet=async()=>{
  try{
tezos.setProvider({rpc:"https://edonet.smartpy.io"})
// console.log("provider set");
// const options={
//   name: "taquito test",
//   eventHandlers:{
//     OPERATION_REQUEST_SUCCESS: {
//       handler:async (data:any)=>{
//            console.log("request successfull",data);
//       }
//     }
//   }

// }
// const wallet=new BeaconWallet(options);
// const wallet = new BeaconWallet({ name: "Beacon Docs Taquito" });

// const network={
// type : NetworkType.EDONET
// }

// await wallet.requestPermissions({network});
// tezos.setWalletProvider(wallet);
// let userAddress=wallet.getPKH();
// console.log(userAddress);

  }



  catch(err){
    console.log(err);
  }
}

wallet();
init();
// Tezos.contract
//   .at('KT1AwinTSnZDEntaLskuaJ8SQ62f2qXw2wDW')
//   .then((contract) => {
//     console.log('returning method');

//   return  contract.methods.addCause(
//   'a','b'
// ).send().then((op)=>{
//   console.log('confirming method');
//   return  op.confirmation()


// }











// window.onload=()=>{
// connect?.addEventListener('click',initWallet)
// }

// const initWallet=async()=>
//   {
//     console.log("wallet permission");
//     try{
//     Tezos.setProvider({rpc: "https://edonet.smartpy.io"})
   
    

    
//   }
//   catch(e)
//   {
//   console.log("error happened",e);
//   }
  // }

  




  
