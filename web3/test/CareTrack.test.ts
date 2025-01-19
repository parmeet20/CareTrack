import { Signer } from "ethers";
import { ethers } from "hardhat";
import { expect } from "chai";
import { CareTrack } from "../typechain-types";

describe("CareTrack", () => {
    let ctx: CareTrack;
    let owner: Signer;
    let doctor1: Signer;
    let doctor2: Signer;
    let person1: Signer;
    let person2: Signer;

    beforeEach(async () => {
        const Cont = await ethers.getContractFactory("CareTrack");
        ctx = await Cont.deploy();
        [owner, doctor1, doctor2, person1, person2] = await ethers.getSigners();

        const tx1 = await ctx.connect(owner).addDoctor(await doctor1.getAddress(),"First Doctor","MD");
        await tx1.wait();
        const tx2 = await ctx.connect(owner).addDoctor(await doctor2.getAddress(),"Second Doctor","MS");
        await tx2.wait();

        const tx3 = await ctx.connect(person1).addPatient("Patient1", 12, 12, 12);
        await tx3.wait();
        const tx4 = await ctx.connect(person2).addPatient("Patient2", 13, 13, 13);
        await tx4.wait();
        
        const tx5 = await ctx.connect(doctor1).addRecord(await doctor1.getAddress(), await person1.getAddress(),"Diagnosis","This is adderss");
        await tx5.wait();
        console.log(await ctx.getRecords(person1));
    });

    it('should check whether the doctors and patients are created or not', async () => {

        const doctor1Details = await ctx.connect(doctor1).getDoctor(await doctor1.getAddress());
        expect(doctor1Details.name).to.equal('First Doctor');
        expect(doctor1Details.specialization).to.equal('MD');
        console.log(await ctx.getDoctor(await doctor1.getAddress()));

        const doctor2Details = await ctx.connect(doctor2).getDoctor(await doctor2.getAddress());
        expect(doctor2Details.name).to.equal('Second Doctor');
        expect(doctor2Details.specialization).to.equal('MS');


        const person1Details = await ctx.connect(person1).getPatient(await person1.getAddress());
        expect(person1Details.name).to.equal("Patient1");

        const person2Details = await ctx.connect(person2).getPatient(await person2.getAddress());
        expect(person2Details.name).to.equal("Patient2");
    });
});
