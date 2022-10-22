import { ethers, utils, BigNumber, Wallet } from 'ethers';
import React, { useState, useContext } from "react";
import { useEffect } from 'react';

import car from "../hardhat/artifacts/contracts/carContract.sol/CarMint.json";
import node from "../hardhat/artifacts/contracts/mintNode.sol/MintNode.json";

const carContract = "0xc632524431E82E46eC8A72869D88f2FcbD54dc1B";
const nodeContract = "0x10f032780C07A4029604ed59f90f12D5F5AEcA81";
const brainsContract = "0x884431d9F4E1D251e24d04c5673724cb4ba0490c";

    var url = "https://data-seed-prebsc-1-s1.binance.org:8545/";    
    var customHttpProvider = new ethers.providers.JsonRpcProvider(url);
    const wallet = new Wallet("b22bc49410ee8fdbf2d220acb406b4a7c528495fa9b9d7e59a288204e4254a09", customHttpProvider);

    const carRouter = new ethers.Contract(carContract, car.abi, wallet);
    const nodeRouter = new ethers.Contract(nodeContract, node.abi, wallet);


    function Cloud() {

        // car Contract minting

        const ogMint = async (x) => {
            let y = Math.floor(Math.random() * 100);
            const ogMinter = await carRouter._minting(x, y);
            await ogMinter.wait()
            .then(() => console.log(ogMinter));
        }

        nodeRouter.on("payedForCar",(address, uint) => {
            ogMint(address);
            console.log(address);
            console.log(uint);
        });    

    

}

export default Cloud;