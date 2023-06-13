import React from 'react'
import { ContractFactory, ethers } from "ethers";
import { useState,useEffect,useCallback } from 'react';
import PhoneScene from './PhoneScene'
import CarScene from './CarScene'
import ComputerScene from './ComputerScene'
import abi from './web3';


// Connect wallet function on click
async function run(){
	const btnConnect = document.getElementById("btn");
	const currentAddress = document.getElementById("currentAddr");
  	if(window.ethereum){
    try {
      const address = "0x1307fec1cec26fab219066b45006c4d44d3905e2";
      const retrieve = await window.ethereum.request({method:"eth_requestAccounts",});
      const provider = new ethers.providers.Web3Provider(ethereum);
      await provider.send("eth_accounts", []);
      const signer = await provider.getSigner();
      const account = await ethereum.request({method: 'eth_accounts'});
      const contract = new ethers.Contract(address, abi, signer);
      btnConnect.textContent = retrieve;
      currentAddress.textContent = retrieve;
    } catch (error) {
      console.log("Something went wrong...")
    }
  }
}

// Item's bidding function
async function bid(x){
  const address = "0x1307fec1cec26fab219066b45006c4d44d3905e2";
  const provider = new ethers.providers.Web3Provider(ethereum);
  await provider.send("eth_accounts", []);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(address, abi, signer);

  await contract.bid(x, {value: ethers.utils.parseEther("0.01")});
}


// Withrawal function on click
async function withdraw(x){
  const address = "0x1307fec1cec26fab219066b45006c4d44d3905e2";
  const provider = new ethers.providers.Web3Provider(ethereum);
  await provider.send("eth_accounts", []);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(address, abi, signer);

  await contract.withdraw();
}

// Winner declaration function
async function declareWinner(){
  const address = "0x1307fec1cec26fab219066b45006c4d44d3905e2";
  const provider = new ethers.providers.Web3Provider(ethereum);
  await provider.send("eth_accounts", []);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(address, abi, signer);

  try {
    await contract.declareWinner();
  } catch {
    console.log("Error");
  }
}

// Resetting the ballot function
async function resetBallot(){
  const address = "0x1307fec1cec26fab219066b45006c4d44d3905e2";
  const provider = new ethers.providers.Web3Provider(ethereum);
  await provider.send("eth_accounts", []);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(address, abi, signer);

  try {
    await contract.reset();
  } catch {
    console.log("Error");
  }
}

// Am i the winner? function. Required to display the winner's after the declaration of them
async function amIWinner(){
  const address = "0x1307fec1cec26fab219066b45006c4d44d3905e2";
  const provider = new ethers.providers.Web3Provider(ethereum);
  await provider.send("eth_accounts", []);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(address, abi, signer);

  try {
    await contract.amIWinner();
  } catch {
    console.log("Error");
  }
}

// Remove ownership from the contract
async function destroyOwnership(){
  const address = "0x1307fec1cec26fab219066b45006c4d44d3905e2";
  const provider = new ethers.providers.Web3Provider(ethereum);
  await provider.send("eth_accounts", []);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(address, abi, signer);

  try {
    await contract.removeOwners();
  } catch {
    console.log("Error");
  }
}

// Transfer ownership functions and button events ↴
async function transferOwnership() {
  var input = document.getElementById("ownerToBeInput").value;
  const address = "0x1307fec1cec26fab219066b45006c4d44d3905e2";
  const provider = new ethers.providers.Web3Provider(ethereum);
  await provider.send("eth_accounts", []);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(address, abi, signer);

  try {
    await contract.transferOwnership(ownerID, input);
  } catch {
    console.log("Error");
  }
}

async function becomeOwner(){
  const address = "0x1307fec1cec26fab219066b45006c4d44d3905e2";
  const provider = new ethers.providers.Web3Provider(ethereum);
  await provider.send("eth_accounts", []);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(address, abi, signer);
  const currentAd = await provider.listAccounts().then(meta => shouldRunPromise = meta.toString());
  try {
    await contract.becomeAdmin();
  } catch {
    console.log("Error");
  }
}

var ownerID;
function ownerBtn1(){
 const btn1Owner = document.getElementById("ownerbtn1");
 const btn2Owner = document.getElementById("ownerbtn2");

 ownerID = 0;
 btn1Owner.style.background='#d97706';
 
 btn2Owner.style.color = "#ffffff"
 btn2Owner.style.background='#000000';
}

function ownerBtn2(){
const btn1Owner = document.getElementById("ownerbtn1");
 const btn2Owner = document.getElementById("ownerbtn2");
 ownerID = 1;
 btn2Owner.style.background='#d97706';
 
 btn1Owner.style.color = "#ffffff"
 btn1Owner.style.background='#000000';
}

// Variables needed to calculate the items bidding count
var promisedVarCar;
var promisedVarPhone;
var promisedVarComputer;
var winnedItemString;

var shouldRunPromise;

// React
const Main = () => {
  
  // Constant declaration and use states
  const [newNameCar, setnewNameCar] = useState("");
  const [newNamePhone, setnewNamePhone] = useState("");
  const [newNameComputer, setnewNameComputer] = useState("");
  const [showText, setShowText] = useState(false);
  const [newNameString, setNewNameString] = useState("");
  const [newBalance, setNewBalance] = useState("");
  const [newOwnersAcc01, setNewOwnersAcc01] = useState("");
  const [newOwnersAcc02, setNewOwnersAcc02] = useState("");
  const [visibilityVar, setVisibility] = useState(false);
  const [winnerVisibility, setWinnerVisibility] = useState(false);
  const buttons = Array(3);
  const [active, setActive] = useState();
  const address = "0x1307fec1cec26fab219066b45006c4d44d3905e2";

  // This is getting ran every second!
  const shuffle = useCallback(async() => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  provider.send("eth_accounts", []);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(address, abi, signer);

  // Is metamask connected and user logged in?
  const shouldRun = await provider.listAccounts().then(meta => shouldRunPromise = meta.toString());
  if(shouldRun != ""){
    const btnConnect = document.getElementById("btn");
    const currentAddress = document.getElementById("currentAddr");
    btnConnect.textContent = shouldRun;
    currentAddress.textContent = shouldRun;
    var ballotCounterCar =  contract.ballotCounter(0).then(meta => {promisedVarCar = meta.toString()});
    var ballotCounterPhone =  contract.ballotCounter(1).then(meta => {promisedVarPhone = meta.toString()});
    var ballotCounterComputer =  contract.ballotCounter(2).then(meta => {promisedVarComputer = meta.toString()});


    // Get contract's owner's address
    var ownersAcc01 = await contract.admins(0);
    var ownersAcc02 = await contract.admins(1);

    var winnersRevealedBool = await contract.winnersRevealed();
    if(winnersRevealedBool == true){
      setWinnerVisibility(true);
    } else {
      setWinnerVisibility(false);
    }


    // Set visibility to owners buttons
    if(shouldRun == ownersAcc01 || shouldRun == ownersAcc02){
      setVisibility(true);
    } else {
      setVisibility(false);
    }
    
    // Contract's Balance
    var contractBalance = contract.printBalance().then(meta => {contractBalance = meta.toString()});
    
    // Am I Winner String
    var winString = await contract.winnedItems().then(value  => winnedItemString = value.toString());
    
    // Setting the use states
    setNewOwnersAcc02(ownersAcc02);
    setNewOwnersAcc01(ownersAcc01);
    setnewNameCar(promisedVarCar);
    setnewNamePhone(promisedVarPhone);
    setnewNameComputer(promisedVarComputer);
    setNewNameString(winnedItemString)
    setNewBalance(contractBalance);

  }
  }, []);

  // Run "shuffle" every second
  useEffect(() => {
    const intervalID = setInterval(shuffle, 1000);
    return () => clearInterval(intervalID);
  }, [shuffle]) 

  // React returns
  return (
    <>
    <div className="flex bg-black p-5 justify-between border-4 border-slate-950 ">
      <ul>
        <img src="GoldenBallotLogo.png" alt=""/>
      </ul>
      <button id="btn"onClick={run} className="text-amber-400 border-4 border-amber-400 hover:bg-amber-400 hover:text-white active:bg-amber-400 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" >Connect Wallet</button>
    </div>
    <div className="bg-black border-2 border-amber-950 p-4"><p className="text-white font-bold text-center"> Contract's Balance: {newBalance / 1000000000000000000} ethers. | Current contract's state: {winnerVisibility === true ? "winners declared, unbiddable" : "biddable"}</p></div>
    <div className="flex w-full bg-gradient-to-r from-blacky-black to-regal-blue h-full justify-evenly p-10 flex-col lg:flex-row">
        <div className="text-white border-4 border-amber-400 rounded-xl h-full w-96">
            <h1 className="text-center text-3xl border-b-4 border-amber-400 bg-blacky-black p-1">Car</h1>
            <div className="h-[23rem]"><CarScene/></div>
            <div className="border-t-4 border-amber-400 bg-black">
              <button onClick={() => bid(0)} className="border border-amber-600 bg-amber-600 hover:border-slate-400 hover:bg-white hover:text-amber-600 rounded-md px-4 py-2 m-5 font-bold uppercase">Bid</button>
              <p id="carCounter" className="float-right p-7 font-bold">{newNameCar}</p>
            </div>
        </div>
        <div className="text-white border-4 border-amber-400 rounded-xl h-full w-96">
            <h1 className="text-center text-3xl border-b-4 border-amber-400 bg-blacky-black p-1">Phone</h1>
            <div className="h-[23rem]"><PhoneScene/></div>
            <div className="border-t-4 border-amber-400 bg-black">
              <button onClick={() => bid(1)} className="border border-amber-600 bg-amber-600 hover:border-slate-400 hover:bg-white hover:text-amber-600 rounded-md px-4 py-2 m-5 font-bold uppercase">Bid</button>
              <p className="float-right p-7 font-bold">{newNamePhone}</p>
            </div>
        </div>
        <div className="text-white border-4 border-amber-400 rounded-xl h-full w-96">
            <h1 className="text-center text-3xl border-b-4 border-amber-400 bg-blacky-black p-1">Computer</h1>
            <div className="h-[23rem]"><ComputerScene/></div> 
            <div className="border-t-4 border-amber-400 bg-black">
              <button onClick={() => bid(2)} className="border border-amber-600 bg-amber-600 hover:border-slate-400 hover:bg-white hover:text-amber-600 rounded-md px-4 py-2 m-5 font-bold uppercase">Bid</button>
              <p className="float-right p-7 font-bold">{newNameComputer}</p>
            </div>
        </div>
    </div>

    <div className="flex flex-col w-full bg-gradient-to-r from-blacky-black to-regal-blue h-full p-10 lg:flex-row">
        <div className="text-white h-96 w-full float-left text-center">
            <h1 className="text-3xl p-1">Current Account:</h1>
            <p id="currentAddr"className="p-5">0x0000000000000000000000000000000000000000</p>
            <button onClick={becomeOwner} className="border border-amber-900 bg-amber-700 hover:border-slate-400 hover:bg-white hover:text-amber-700 rounded-3xl px-4 py-2 m-5 font-bold uppercase">Become Admin</button> <br />
            <button style={winnerVisibility === true ? {visibility:"visible"} : {visibility:"hidden"}} onClick={amIWinner} className="border border-amber-900 bg-amber-700 hover:border-slate-400 hover:bg-white hover:text-amber-700 rounded-3xl px-4 py-2 m-5 font-bold uppercase">Am i winner?</button>
            <button style={winnerVisibility === true ? {visibility:"visible"} : {visibility:"hidden"}} onClick={() => setShowText(!showText)}><img src="arrowDown.png" className="h-4 w-4"></img></button>
            <p style={winnerVisibility === true ? {visibility:"visible"} : {visibility:"hidden"}}>{showText && newNameString}</p>
        </div>
        <div className="text-white h-96 w-full float-right text-center">
            <h1 className="text-3xl p-1">Owner's Accounts:</h1>
            <p className="font-bold text-amber-400 ">Owner's Position One: <p className="font-normal text-white">{newOwnersAcc01}</p><p className="font-bold text-amber-400">Owner's Position Two: </p><p className="font-normal text-white">{newOwnersAcc02}</p></p>
            <div style={visibilityVar === true ? {visibility:"visible"} : {visibility:"hidden"}}>
            <button onClick={withdraw} className="border border-amber-400 bg-zinc-950 hover:bg-amber-400 hover:border-zinc-950 hover:text-black rounded-3xl px-4 py-2 m-5 font-bold uppercase">Withdraw</button> <br />
            <button onClick={declareWinner} className="border border-amber-400 bg-zinc-950 hover:bg-amber-400 hover:border-zinc-950 hover:text-black rounded-3xl px-4 py-2 m-5 font-bold uppercase">Declare Winner</button><br/>
            <button onClick={resetBallot} className="border border-amber-400 bg-zinc-950 hover:bg-amber-400 hover:border-zinc-950 hover:text-black rounded-3xl px-4 py-2 m-5 font-bold uppercase">Reset Ballot</button><br/>
            <button onClick={destroyOwnership} className="border border-amber-400 bg-zinc-950 hover:bg-amber-400 hover:border-zinc-950 hover:text-black rounded-3xl px-4 py-2 m-5 font-bold uppercase">Destroy Ownership</button>
            </div>
        </div>
    </div>
    <div className="py-10 bg-gradient-to-r from-blacky-black to-regal-blue text-center">
      <h1 style={visibilityVar === true ? {visibility:"visible"} : {visibility:"hidden"}} className="py-5 font-bold text-white uppercase text-lg">Transfer Ownership</h1>
      <button style={visibilityVar === true ? {visibility:"visible"} : {visibility:"hidden"}} onClick={ownerBtn1} id="ownerbtn1" className="p-2 mx-2 text-white bg-amber-700 rounded-sm font-bold hover:bg-amber-900 hover:text-white">Owner Position 1</button>
      <button style={visibilityVar === true ? {visibility:"visible"} : {visibility:"hidden"}}onClick={ownerBtn2} id="ownerbtn2" className="p-2 mx-2 text-white bg-amber-700 rounded-sm font-bold hover:bg-amber-900 hover:text-white">Owner Position 2</button>
        <form style={visibilityVar === true ? {visibility:"visible"} : {visibility:"hidden"}} className="p-4 ">
          <label className="font-bold text-white mx-4" htmlFor="name">Owner to be: </label>
          <input className="bg-black border border-amber-400 rounded-2xl p-2 text-white" type="text" id="ownerToBeInput" />
          <button type="button" onClick={transferOwnership} className="border border-amber-400 bg-white hover:bg-amber-400 hover:border-zinc-950 hover:text-black rounded-3xl px-4 py-2 m-5 font-bold uppercase">Submit</button>
        </form>
    </div>
    <div className="flex bg-gradient-to-r bg-black justify-between text-white p-20 flex-col lg:flex-row">
      <div>
        <p className="font-bold">Summary <p className="text-amber-400">A university project made by Petros Tsokas.<br/> All images and 3D model used were either made by me <br/> or downloaded through websites <br/> under the CC0-Royalty-Free license.</p></p>
        <img className="py-3" src="cc0license.png"/>
      </div>
      <div>
        <p className="font-bold">How to play: <p className="text-amber-400" >1st Step: Connect your wallet. <br/> 2nd Step: Bid on your desired item. <br/> 3d Step: Wait for contract owner to declare the winner.</p> </p>
      </div>
      <div>
        <p className="font-bold">Owner's Instructions: <p className="text-amber-400" >1. Connect your wallet. <br/>2. Withdraw button gives highlighted owner all of the contract's balance <br/>3. Declare a winner by pressing the button "DECLARE WINNER". <br/> 4. Reset the whole contract back to it's original state. <br/> 5. Clear all the contract's admins. Note that this CAN'T be undone. <br/> 6. Transfer the ownership to an address of your choice. <br/> simply select between the two indexes from the buttons, <br/> write down the contract's new admin address and press "Submit"</p> </p>
      </div>
      <div>
        <p className="font-bold">Contact me:<br/> <p className="text-amber-400"> <a href="mailto:pettsok3@gmail.com">pettsok3@gmail.com</a> <br/> <a target="_blank" href="https://github.com/TsokasGit">Github</a></p></p>
      </div>
      
    </div>
</>
  )
}


export default Main;