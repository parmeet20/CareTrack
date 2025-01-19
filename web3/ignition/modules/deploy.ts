import { ethers } from "hardhat"

const main = async()=>{
    const Ctx = await ethers.getContractFactory("CareTrack");
    const ctx = await Ctx.deploy();
    console.log(`DEPLOYED TO ADDRESS -> ${await ctx.getAddress()}`);
}
main();