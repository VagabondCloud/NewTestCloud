import { ethers, utils, BigNumber, Wallet } from 'ethers';
import React, { useState, useContext } from "react";
import { useEffect } from 'react';

import car from "../hardhat/artifacts/contracts/carContract.sol/CarMint.json";
import node from "../hardhat/artifacts/contracts/mintNode.sol/MintNode.json";

const carContract = "0x82851FCB4f4436392225D5C7bAa67Df660Ac9246";
const nodeContract = "0x9877b01354a44E07104cb9B483BD3804Ca2cc635";
const brainsContract = "0x2fc7BF39a8141Cd114a8191b605603DF0495b9E9";

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